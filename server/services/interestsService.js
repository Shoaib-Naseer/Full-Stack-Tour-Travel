const { Interest } = require("../models");

async function getAllInterests() {
  return Interest.findAll();
}

async function createInterest(name, description) {
  return Interest.create({ name, description });
}

async function updateInterest(id, data) {
  const [, updatedRows] = await Interest.update(data, {
    where: { interest_id: id },
    returning: true,
  });

  const updatedInterest = updatedRows[0].get({ plain: true });
  return updatedInterest;
}

async function getInterest(id) {
  const interest = await Interest.findOne({ where: { interest_id: id } });
  return interest;
}

async function deleteInterest(id) {
  const interest = await Interest.findByPk(id);
  await interest.destroy();
  return interest;
}

module.exports = {
  getAllInterests,
  createInterest,
  updateInterest,
  getInterest,
  deleteInterest,
};
