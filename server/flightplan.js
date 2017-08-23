var plan = require('flightplan');
var appName = 'battlestations';
var username = 'dylan';

plan.target('prod', {
    host: '165.227.67.146',
    username: username,
    agent: process.env.SSH_AUTH_SOCK,
    webRoot: '/var/www/battlestations.builtrightapp.com/battlestations/server',
    ownerUser: 'dylan',
    repository: 'https://github.com/dylanlott/battlestations.git',
    branchName: 'master',
    maxDeploys: 10
});

plan.remote('setup', function(remote) {
    remote.hostname();
    remote.with('cd ' + remote.runtime.webRoot, function() {
        remote.sudo('git clone ' + remote.runtime.repository);
        remote.sudo('npm install');
        remote.sudo('npm install -g pm2');
        remote.sudo('pm2 start index.js');
    })
})

plan.local('deploy', function(local) {
    local.hostname();
    local.failsafe();
    local.exec('git add . && git commit -am "flightplan push"');
    local.log('Committed to GitHub');
    local.exec('git push origin master');
    local.log('Pushed to GitHub');
    local.unsafe();
});

plan.remote('deploy', function(remote) {
    remote.hostname();
    remote.with('cd ' + remote.runtime.webRoot, function() {
        remote.sudo('sudo git pull origin master');
        remote.sudo('sudo npm install');
        remote.failsafe();
        remote.exec('sudo pm2 restart index.js');
        remote.unsafe();
        remote.exec('sudo pm2 list');
        remote.log('Deploy successful');
    });
});

plan.remote('check', function(remote) {
  remote.exec('sudo pm2 list');
  remote.exec('sudo pm2 logs battlestations');
});

plan.remote('monitor', function(remote) {
  remote.exec('sudo pm2 monit');
});
