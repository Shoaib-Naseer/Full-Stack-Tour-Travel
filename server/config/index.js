require("dotenv").config();

// PORT
const port = process.env.PORT;

// DB config
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;
const dialect = process.env.DB_DIALECT;
const host = process.env.DB_HOST;

module.exports = {
  port,
  username,
  password,
  database,
  dialect,
  host,
};
