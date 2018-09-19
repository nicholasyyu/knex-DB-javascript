// Update with your config settings.
const settings = require("./settings");

module.exports = {

  development: {
    client: 'pg',
    version: '7.2',
    connection: {
      host : '127.0.0.1',
      user : settings.user,
      password : settings.password,
      database : settings.database,
      filename: './dev.pg'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
