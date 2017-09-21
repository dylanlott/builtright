var plan = require('flightplan');
var appName = 'builtright';
var username = 'deploy';
var startFile = 'bin/www';

plan.target('dev', {
	host: '165.227.67.146',
  username: 'dylan',
  agent: process.env.SSH_AUTH_SOCK,
	webRoot: '/var/www/dev.builtrightapp.com/client',
  ownerUser: 'root',
  repository: 'https://github.com/dylanlott/builtright-vue.git',
  branchName: 'master',
  maxDeploys: 10
});

plan.target('prod', {
  host: '159.203.106.53',
  username: 'dylan',
  agent: process.env.SSH_AUTH_SOCK,
  webRoot: '/var/www/builtrightapp.com/client',
  repository: 'https://github.com/dylanlott/builtright-vue.git',
  branchName: 'master'
});

plan.local('docker', function(local) {
  local.hostname();
	local.exec('npm run build');
  local.exec('docker build -t hivemindapps/builtright-nginx .');
  local.exec('docker push hivemindapps/builtright-nginx');
  local.log('Docker image built successfully and pushed to Docker Hub');
});

plan.remote('docker', function(remote) {
  remote.hostname();
  remote.exec('docker pull hivemindapps/builtright-nginx:latest');
	remote.exec('docker restart builtright-nginx');
  remote.exec('docker ps');
  remote.exec('docker logs builtright-nginx');
});

plan.local('git', function(local) {
	local.hostname();
	local.exec('git push deploy master')
});

plan.remote('git', function(remote) {
	remote.hostname();
	remote.with('cd /var/www/builtrightapp.com/client', function() {
		remote.exec('sudo git pull origin master');
		remote.exec('sudo npm install');
		remote.exec('sudo npm run build');
	});
});

plan.remote('check', function(remote) {
  remote.exec('docker ps');
});
