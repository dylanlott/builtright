const plan = require('flightplan');

const username = 'root';

plan.target('prod', {
  host: '104.236.29.255',
  username,
  agent: process.env.SSH_AUTH_SOCK,
  webRoot: '/var/www/',
  ownerUser: username,
  repository: 'https://github.com/dylanlott/builtright.git',
  branchName: 'master'
});

plan.local('deploy', function (local) {
  const payload = local.exec('git ls-files', { silent: true });
  local.transfer(payload, '/var/www/app/server', {
    silent: false
  });
});

plan.remote('deploy', function (remote) {
  remote.with('cd /var/www/app/server', () => {
    remote.log('installing dependencies');
    remote.exec('npm install');
    remote.log('reticulating splines');
    remote.exec('pm2 restart index.js --name builtright');
    remote.log('processes restarted, deploy successful');
    remote.exec('pm2 list');
    remote.exec('pm2 logs');
  });
});

plan.local('env', function (local) {
  local.transfer('./.env', '/var/www/app/server');
  local.log('environment settings uploaded');
});

plan.remote('check', function(remote) {
  remote.exec('pm2 list');
  remote.exec('pm2 logs builtright');
});

plan.remote('monitor', function(remote) {
  remote.exec('pm2 monit');
});
