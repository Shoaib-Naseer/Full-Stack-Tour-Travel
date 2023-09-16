const db = require('../models'); // Import your database setup here

module.exports = async()={
  beforeAll(async () => {
    await db.sequelize.sync({ force: true }); 
  });
  
  afterAll(async () => {
    await db.sequelize.close();
  });
}
