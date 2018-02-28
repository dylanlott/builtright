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

plan.local('secrets', function (local) {
  local.log('transferring secrets');
  local.transfer('./client/.env', '/opt/builtright/client');
  local.transfer('./server/.env', '/opt/builtright/server');
});

plan.remote('deploy', function (remote) {
  remote.with('cd /opt/builtright', function () {
    remote.exec('git pull http master');
    remote.exec('docker-compose up --build -d server');
  });

  // deploy client
  remote.with('cd /opt/builtright/client', function () {
    remote.exec('npm install')
    remote.exec('npm rebuild')
    remote.exec('npm run build')
  });

  remote.exec('docker ps');
  remote.log('#### DEPLOY SUCCESSFUL ####');
});

plan.remote('ghost', function (remote) {
  remote.with('cd /opt/builtright', function () {
    remote.exec('docker-compose up -d ghost')
    remote.exec('docker ps')
  })
})

plan.remote('caddy', function (remote) {
  remote.with('cd /opt/builtright', function () {
    remote.exec('git pull http master');
    remote.exec('systemctl restart caddy.service')
  })
})

plan.remote('check', function (remote) {
  remote.exec('docker ps')
})
