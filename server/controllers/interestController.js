const interestsService = require("../services/interestsService");

async function getAllInterests(req, reply) {
  try {
    const interests = await interestsService.getAllInterests();
    reply.status(200).send({ message: "success", data: { interests } });
  } catch (error) {
    reply.code(400).send({ message: "failure", error: error.message });
  }
}

async function createInterest(req, reply) {
  const { name, description = "" } = req.body;
  try {
    const interest = await interestsService.createInterest(name, description);
    reply.status(201).send({ message: "success", data: { interest } });
  } catch (error) {
    reply.code(400).send({ message: "failure", error: error.message });
  }
}

async function updateInterest(req, reply) {
  const { id } = req.params;
  const { name, description = "" } = req.body;
  try {
    const interestExists = await interestsService.getInterest(id);
    if (!interestExists) {
      return reply.status(404).send({  message: "failure",error: "Interest not Found" });
    }
    const interest = await interestsService.updateInterest(id, {
      name,
      description,
    });
    reply.status(201).send({ message: "success", data: { interest } });
  } catch (error) {
    reply.code(400).send({ message: "failure", error: error.message });
  }
}

async function getInterest(req, reply) {
  const { id } = req.params;
  try {
    const interest = await interestsService.getInterest(id);
    if (interest) {
      reply.status(200).send({ message: "success", data: { interest } });
    } else {
      reply.status(404).send({  message: "failure",error: "Interest not found" });
    }
  } catch (error) {
    reply.code(400).send({ message: "failure", error: error.message });
  }
}

async function deleteInterest(req, reply) {
  const { id } = req.params;
  try {
    const interestExists = await interestsService.getInterest(id);
    if (interestExists) {
      const interest = await interestsService.deleteInterest(id);
      reply.status(200).send({ message: "success", data: { interest } });
    } else {
      return reply.status(404).send({ message: "failure", error: "Interest not found" });
    }
  } catch (error) {
    reply.code(400).send({ message: "failure", error: error.message });  }
}

module.exports = {
  getAllInterests,
  createInterest,
  updateInterest,
  getInterest,
  deleteInterest,
};
