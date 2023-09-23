require("dotenv").config();

module.exports = {
  app: {
    title: process.env.APP_TITLE || "Tours",
    port: process.env.PORT || 5000,
    backendURL: process.env.BACKEND_URL || "http://localhost:5000/",
    frontendURL: process.env.FRONTEND_URL || "http://localhost:8081/",
    filesPath: process.env.FILES_PATH || "http://localhost:5000/files/",
    apiPath: process.env.API_PATH || "/api/v1/",
    swagger: {
      apiPath: process.env.SWAGGER_API_PATH || "/api/v1/",
      routePath: process.env.SWAGGER_ROUTE_PATH || "/api/v1/api-docs",
    },
  },
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    dialect: process.env.DB_DIALECT || "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
  },
  test: {
    username: process.env.TEST_DB_USERNAME,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_DATABASE,
    host: process.env.TEST_DB_HOST,
    dialect: process.env.TEST_DB_DIALECT || "postgres",
    port: process.env.TEST_DB_PORT || 3306,
  },
  jwt: {
    accessTokenSecret: process.env.JWT_SECRET || "jwtaccesssecrettokenstring",
    refreshTokenSecret: process.env.JWT_SECRET || "jwtrefreshsecrettokenstring",
    expirationShortInSeconds:
      process.env.JWT_EXPIRATION_IN_SECONDS_SHORT || 3600000,
    expirationLongInSeconds:
      process.env.JWT_EXPIRATION_IN_SECONDS_LONG || 3600000,
    refreshExpirationInSeconds:
      process.env.JWT_REFRESH_TOKEN_EXPIRATION_IN_SECONDS || 7200000,
    saltRounds: process.env.SALT_ROUNDS || 10,
    tokenExpiryExtensionSeconds: 60 * 60 * 24 * 365,
    logoutExpirationToken:rocess.env.JWT_LOGOUT_ACCESS_TOKEN_EXPIRATION_IN_SECONDS || 1
  },
};
