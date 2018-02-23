const plan = require('flightplan');
const username = 'root';

plan.target('prod', {
  host: '138.68.27.220',
  username: username,
  agent: process.env.SSH_AUTH_SOCK,
  webRoot: '/opt/builtright/',
  ownerUser: username,
  repository: 'https://github.com/dylanlott/builtright.git',
  branchName: 'master'
});

plan.local('deploy', function (local) {
  local.log('sending main payload');
  const payload = local.exec('git ls-files', { silent: true });
  local.transfer(payload, '/opt/builtright/');
  local.log('transferring secrets');
  local.transfer('./server/.env', '/opt/builtright/server');
});

plan.remote('deploy', function (remote) {
  remote.with('cd /opt/builtright', function () {
    remote.exec('docker-compose up -d server');
    remote.exec('which npm');
    remote.sudo('which npm');
    remote.exec('./deploy.sh');
    remote.exec('docker ps');
    remote.log('#### DEPLOY SUCCESSFUL ####');
  });
});

plan.remote('check', function (remote) {
  remote.exec('docker ps')
})
