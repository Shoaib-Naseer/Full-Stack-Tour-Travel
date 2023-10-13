const config = require('./index')

module.exports = {
  development: {
    "username": config.development.username,
    "password": config.development.password,
    "database": config.development.database,
    "host": config.development.host,
    "dialect": config.development.dialect,
    logging: false,
  },
  test: {
    "username": config.test.username,
    "password": config.test.password,
    "database": config.test.database,
    "host": config.test.host,
    "dialect": config.test.dialect,
    logging: false,
  }
}
