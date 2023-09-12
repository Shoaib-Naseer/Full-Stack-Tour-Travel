const fastify = require("fastify")();
const cors = require("cors");
const config = require("./config");
const userRoutes = require("./routes/users");
const db = require("./models");
const categoryRoutes = require("./routes/categoryRoutes");

const port = config.port || 8000;

fastify.register(userRoutes);
fastify.register(categoryRoutes);

// Register fastify-swagger for documentation
fastify.register(require('@fastify/swagger'), {
  routePrefix: '/docs',
  swagger: {
    info: {
      title: 'Tourism API',
      version: '1.0.0',
    },
  },
  exposeRoute: true,
});


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
