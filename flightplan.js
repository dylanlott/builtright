const plan = require('flightplan');

plan.local('deploy', function (local) {
  local.log('sending main payload');
  const payload = local.exec('git ls-files', { silent: true });
  local.transfer(payload, '/var/www/builtrightapp.com/');
  local.log('transferring secrets');
  local.transfer('./server/.env', '/var/www/builtrightapp.com/');
  local.transfer('./server/.env.docker', '/var/www/builtrightapp.com/');
  local.transfer('./client/.env', '/var/www/builtrightapp.com/');
  local.transfer('./client/.env.docker', '/var/www/builtrightapp.com');
});

plan.remote('deploy', function (remote) {
  remote.log('installing dependencies');
  remote.exec('sudo npm install');
  remote.log('reloading servers');
  remote.with('cd /var/www/builtrightapp.com/server', function () {
    remote.exec('sudo pm2 restart index.js');
  });
});
