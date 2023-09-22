let fastify;
const cors = require("cors");
const config = require("./config");
const userRoutes = require("./routes/users");
const db = require("./models");
const categoryRoutes = require("./routes/categoryRoutes");
const interestsRoutes = require("./routes/interestsRoute");
const toursRoutes = require("./routes/tourRoutes");
const imageRoutes = require("./routes/imageRoute");

const fastifySwagger = require("@fastify/swagger");
const fastifySwaggerUi = require("@fastify/swagger-ui");
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

fastify = require("fastify")();

const swaggerOptions = {
  swagger: {
    info: {
      title: "Tourism Api",
      description: "API Docs",
      version: "1.0.0",
    },
    host: "localhost",
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [{ name: "Default", description: "Default" }],
  },
};

const swaggerUiOptions = {
  routePrefix: "/docs",
  exposeRoute: true,
};



const port = config.port || 8000;

fastify.register(fastifySwagger, swaggerOptions);
fastify.register(fastifySwaggerUi, swaggerUiOptions);

fastify.register(require("fastify-file-upload"));

fastify.register(async(fastify, options, done) => {
  fastify.register(authRoutes);
  fastify.register(categoryRoutes);
  fastify.register(interestsRoutes);
  fastify.register(toursRoutes);
  fastify.register(imageRoutes);
  fastify.register(bookingRoutes);

  done();
});

const start = async () => {
  try {
    await db.sequelize.sync();
    await fastify.listen({ port, host: "0.0.0.0" });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server is running at http://localhost:${port}`);
};

["SIGINT", "SIGTERM"].forEach((signal) => {
  process.on(signal, async () => {
    await fastify.close();
    process.exit(0);
  });
});

if(process.env.NODE_ENV !=="test"){
  start();
}

module.exports = fastify