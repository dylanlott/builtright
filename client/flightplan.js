var plan = require('flightplan');
var appName = 'builtright';
var username = 'dylan';
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
  host: '165.227.67.146',
  username: 'dylan',
  agent: process.env.SSH_AUTH_SOCK,
  webRoot: '/var/www/builtrightapp.com/client',
  repository: 'https://github.com/dylanlott/builtright-vue.git',
  branchName: 'master'
});

plan.local('deploy', function(local) {
  local.log('pushing changes');
  local.exec('git commit -am "flightplan deploy"');
	local.exec('git push origin master');
});

plan.remote('deploy', function(remote) {
  remote.log('pulling down changes');
	remote.with('cd /var/www/builtrightapp.com/client', function() {
		remote.exec('sudo git pull origin master');
    remote.log('installing updates and changes');
		remote.exec('sudo npm install');
    remote.log('building package');
		remote.exec('sudo npm run build');
	});
});

plan.remote('check', function(remote) {
  remote.exec('docker ps');
});
