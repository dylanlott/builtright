const SqliteToMongo = require('sqlite-to-mongo');

var importer = new SqliteToMongo('db.sqlite', 'mongodb://localhost/dbname');

importer.importCollection('users', {
  tableName : "USERS_TABLE",
  columns: {
    ID: '_id',
    USERNAME: 'username',
    EMAIL : 'profile.email'
  }
});
