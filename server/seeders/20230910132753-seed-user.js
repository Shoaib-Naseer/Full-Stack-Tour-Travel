"use strict";
const config = require("../config");
const usersData = require("../data/users");
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const startingPrimaryKeyValue = 1;

    // Truncate the "Roles" table to reset primary key increments
    await queryInterface.sequelize.query(
      `TRUNCATE TABLE "Users" RESTART IDENTITY CASCADE`,
    );

   // Hash passwords and insert data with the specified starting primary key value
   const hashedUsersData = await Promise.all(
    usersData.map(async (user, index) => {
      const hashedPassword = await bcrypt.hash(user.password, config.jwt.saltRounds);
      return {
        ...user,
        user_id: startingPrimaryKeyValue + index,
        password: hashedPassword, // Replace the plain text password with the hashed password
      };
    })
  );

  await queryInterface.bulkInsert("Users", hashedUsersData, {});
  },

  async down(queryInterface, Sequelize) {
    // Truncate the "Roles" table to reset primary key increments
    await queryInterface.sequelize.query(
      `TRUNCATE TABLE "Categories" RESTART IDENTITY CASCADE`,
    );
  },
};
