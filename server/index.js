const fastify = require("fastify")();
const dotenv = require("dotenv");
const cors = require("cors");
const config = require("./config");
const userRoutes = require("./routes/users");
const db = require("./models")

const port = config.port || 8000;

fastify.register(userRoutes);


const start = async () => {
  try {
    await db.sequelize.sync({alter:true})
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
