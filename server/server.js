let app;
const cors = require("@fastify/cors");
const config = require("./config");
const path =require('path')

const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const interestsRoutes = require("./routes/interestsRoute");
const toursRoutes = require("./routes/tourRoutes");
const imageRoutes = require("./routes/imageRoute");

const fastifySwagger = require("@fastify/swagger");
const fastifySwaggerUi = require("@fastify/swagger-ui");

const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const pickupRoutes = require("./routes/pickupLocationRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

app = require("fastify")();

const port = config.app.port || 8000;

const routeGroups = [
  { name: "Auth", routes: authRoutes,},
  { name: "Categories", routes: categoryRoutes },
  { name: "Interests", routes: interestsRoutes },
  { name: "Tours", routes: toursRoutes },
  { name: "Images", routes: imageRoutes },
  { name: "Bookings", routes: bookingRoutes },
  { name: "Reviews", routes: reviewRoutes },
  { name: "Users", routes: userRoutes },
  { name: "Pickups", routes: pickupRoutes },
  {name: "Payments", routes:paymentRoutes}
];

const swaggerOptions = {
  swagger: {
    info: {
      title: config.app.swagger.title,
      description: config.app.swagger.title,
      version: "1.0.0",
    },
    host: "localhost",
    tags: routeGroups.map((group) => ({
      name: group.name, 
      description: group.name,
    })),
  },
};

const swaggerUiOptions = {
  routePrefix: config.app.swagger.routePath,
  exposeRoute: true,
};



app.register(cors);

app.register(fastifySwagger, swaggerOptions);
app.register(fastifySwaggerUi, swaggerUiOptions);

app.register(require("fastify-file-upload"));


app.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/public/',
})

app.register(async(fastify, options, done) => {
  routeGroups.forEach(({ name, routes }) => {
    app.register(routes);
  });

  done();
});

const start = async () => {
  try { 
    // await db.sequelize.sync({force:true});
    await app.listen({ port, host: "0.0.0.0" });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server is running at http://localhost:${port}`);
};

["SIGINT", "SIGTERM"].forEach((signal) => {
  process.on(signal, async () => {
    await app.close();
    process.exit(0);
  });
});

if (process.env.NODE_ENV !== "test") {
  start();
}



module.exports = app