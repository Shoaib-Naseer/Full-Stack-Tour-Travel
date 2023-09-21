const interestsService = require("../services/interestsService");

async function getAllInterests(req, reply) {
  try {
    const interests = await interestsService.getAllInterests();
    reply.send(interests);
  } catch (error) {
    reply.status(400).send({ error: "Failed to fetch interests" });
  }
}

async function createInterest(req, reply) {
  const { name, description = "" } = req.body;

  try {
    const interest = await interestsService.createInterest(name, description);
    reply.status(201).send(interest);
  } catch (error) {
    reply.status(400).send({ error: "Failed to create interest" });
  }
}

async function updateInterest(req, reply) {
  const { id } = req.params;
  const { name, description = "" } = req.body;

  try {
    const interest = await interestsService.getInterest(id);
    if (!interest){
      return reply.status(404).send({ error: "Interest not Found" });
    }
    const isUpdated = await interestsService.updateInterest(id, {
      name,
      description,
    });
    if (isUpdated) {
      const updatedInterest = await interestsService.getInterest(id);
      reply.send(updatedInterest);
    } else {
      reply.status(404).send({ error: "Failed to update interest" });
    }
  } catch (error) {
    reply.status(400).send({ error: "Failed to update interest" });
  }
}

async function getInterest(req, reply) {
  const { id } = req.params;

  try {
    const interest = await interestsService.getInterest(id);

    if (interest) {
      reply.send(interest);
    } else {
      reply.status(404).send({ error: "Interest not found" });
    }
  } catch (error) {
    reply.status(400).send({ error: "Failed to Find interest" });
  }
}

async function deleteInterest(req, reply) {
  const { id } = req.params;
  try {
    const interest = await interestsService.getInterest(id);
    if (interest) {
      const message = await interestsService.deleteInterest(id);
      reply.send(message);
    } else {
      reply.status(404).send({ error: "Interest not found" });
    }
  } catch (error) {
    reply.status(400).send({ error: "Failed to Find interest" });
  }
}

module.exports = {
  getAllInterests,
  createInterest,
  updateInterest,
  getInterest,
  deleteInterest,
};
