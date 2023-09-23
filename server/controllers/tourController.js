const tourService = require("../services/tourService");

async function getAllTours(req, reply) {
  try {
    const tours = await tourService.getAllTours();
    reply.send({ message: "success", data: { tours } });
  } catch (error) {
    reply.status(400).send({ message: "failure", error: error.message });
  }
}

async function createTour(req, reply) {
  try {
    const tour = await tourService.createTour(req.body);
    reply.status(201).send({ message: "success", data: { tour } });
  } catch (error) {
    reply.status(400).send({ message: "failure", error: error.message });
  }
}

async function getTour(req, reply) {
  const { id } = req.params;
  try {
    const tour = await tourService.getTourById(id);
    if (!tour)
      return reply
        .status(404)
        .send({ message: "failure", error: "Tour not found" });
    reply.send({ message: "success", data: { tour } });
  } catch (error) {
    reply.status(400).send({ message: "failure", error: error.message });
  }
}

// Update a tour by ID
async function updateTour(req, reply) {
  const { id } = req.params;
  try {
    const tourExists = await tourService.getTourById(id);
    if (!tourExists) {
      return reply
        .status(404)
        .send({ message: "failure", error: "Tour not found" });
    }
    const tour = await tourService.updateTour(id, req.body);
    reply.send({ message: "success", data: { tour } });
  } catch (error) {
    reply.status(400).send({ message: "failure", error: error.message });
  }
}

// Delete a tour by ID
async function deleteTour(req, reply) {
  const { id } = req.params;
  try {
    const tourExists = await tourService.getTourById(id);
    if (!tourExists) {
      return reply
        .status(404)
        .send({ message: "failure", error: "Tour not found" });
    }
    const tour = await tourService.deleteTour(id);
    reply.send({ message: "success", data: { tour } });
  } catch (error) {
    reply.status(400).send({ message: "failure", error: error.message });
  }
}

module.exports = {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
};
