const { Interest } = require("../models");

async function getAllInterests() {
  return Interest.findAll();
}

async function createInterest(name, description) {
  return Interest.create({ name, description });
}

async function updateInterest(id, data) {
  const [updatedRows] = await Interest.update(data, {
    where: { interest_id: id },
  });
  return updatedRows > 0;
}

async function getInterest(id) {
  const interest = await Interest.findOne({ where: { interest_id: id } });
  return interest;
}

async function deleteInterest(id) {
  const interest = await Interest.findByPk(id);
  await interest.destroy();
  return { message: "Interest deleted successfully" };
}

module.exports = {
  getAllInterests,
  createInterest,
  updateInterest,
  getInterest,
  deleteInterest,
};
