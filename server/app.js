const app = require("fastify")();
const userRoutes = require("./routes/users");
const categoryRoutes = require("./routes/categoryRoutes");
const interestsRoutes = require("./routes/InterestsRoute");
const fastifySwagger = require("@fastify/swagger");
const fastifySwaggerUi = require("@fastify/swagger-ui");


function getServer() {
  app.register(userRoutes);
  app.register(categoryRoutes);
  app.register(interestsRoutes);
  return app;
}

module.exports = getServer;
