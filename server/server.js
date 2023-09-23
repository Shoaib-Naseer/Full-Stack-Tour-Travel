let fastify;
const cors = require("cors");
const config = require("./config");
const userRoutes = require("./routes/userRoutes");
const db = require("./models");
const categoryRoutes = require("./routes/categoryRoutes");
const interestsRoutes = require("./routes/interestsRoute");
const toursRoutes = require("./routes/tourRoutes");
const imageRoutes = require("./routes/imageRoute");

const fastifySwagger = require("@fastify/swagger");
const fastifySwaggerUi = require("@fastify/swagger-ui");
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

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

const routeGroups = [
  { name: "Auth", routes: authRoutes },
  { name: "Categories", routes: categoryRoutes },
  { name: "Interests", routes: interestsRoutes },
  { name: "Tours", routes: toursRoutes },
  { name: "Images", routes: imageRoutes },
  { name: "Bookings", routes: bookingRoutes },
  { name: "Reviews", routes: reviewRoutes },
  { name: "Users", routes: userRoutes },
];


fastify.register(fastifySwagger, swaggerOptions);
fastify.register(fastifySwaggerUi, swaggerUiOptions);

fastify.register(require("fastify-file-upload"));

fastify.register(async(fastify, options, done) => {
  routeGroups.forEach(({ name, routes }) => {
    fastify.register(routes, { prefix: `/${name.toLowerCase()}` });
  });

  done();
});

const start = async () => {
  try { 
    // await db.sequelize.sync();
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