var plan = require('flightplan');
var appName = 'builtright';
var username = 'dylan';
var startFile = 'bin/www';

plan.target('prod', {
  host: '104.236.29.255',
  username: 'root',
  agent: process.env.SSH_AUTH_SOCK,
	webRoot: '/var/www/app/client',
  ownerUser: 'root',
  repository: 'https://github.com/dylanlott/builtright-vue.git',
  branchName: 'master',
  maxDeploys: 10
});

plan.local('deploy', function(local) {
  local.log('building client application');
  local.exec('npm run build');
  local.transfer('./dist', '/var/www/app/client');
  local.transfer('index.html', '/var/www/app/client');
  local.log('files transferred');
});

plan.remote('check', function(remote) {
  remote.exec('docker ps');
});
