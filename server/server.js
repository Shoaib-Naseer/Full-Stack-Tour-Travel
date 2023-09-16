const fastify = require("fastify")();
const cors = require("cors");
const config = require("./config");
const userRoutes = require("./routes/users");
const db = require("./models");
const categoryRoutes = require("./routes/categoryRoutes");
const interestsRoutes = require("./routes/InterestsRoute");

const fastifySwagger = require("@fastify/swagger");
const fastifySwaggerUi = require("@fastify/swagger-ui");
const authRoutes = require("./routes/authRoutes");

const app = require("fastify")();

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

fastify.register(authRoutes);
fastify.register(categoryRoutes);
fastify.register(interestsRoutes);
app.register(fastifySwagger, swaggerOptions);
app.register(fastifySwaggerUi, swaggerUiOptions);


const start = async () => {
  try {
    await db.sequelize.sync()
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

start();
