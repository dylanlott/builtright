const plan = require('flightplan');

const username = 'root';
const dev = '159.89.132.122'
const prod = '165.227.67.146';

plan.target('prod', {
  host: dev,
  username,
  agent: process.env.SSH_AUTH_SOCK,
  webRoot: '/var/www/',
  ownerUser: username,
  repository: 'https://github.com/dylanlott/builtright.git',
  branchName: 'master'
});

plan.local('deploy', function (local) {
  local.log('transferring files');
  const payload = local.exec('git ls-files', { silent: true });
  local.transfer(payload, '/var/www/builtright/server', {
    silent: false,
    user: username
  });
  local.log('files transferred');
});

plan.remote('deploy', function (remote) {
  remote.with('cd /var/www/builtright/server', () => {
    remote.log('installing dependencies');
    remote.exec('sudo npm install');
    remote.log('reticulating splines');
    remote.exec('sudo pm2 restart index.js --name builtright');
    remote.log('processes restarted, deploy successful');
    remote.exec('sudo pm2 list');
  });
});

plan.remote('check', function(remote) {
  remote.exec('sudo pm2 list');
  remote.exec('sudo pm2 logs builtright');
});

plan.remote('monitor', function(remote) {
  remote.exec('sudo pm2 monit');
});
