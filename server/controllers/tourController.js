const tourService = require("../services/tourService");


async function getAllTours(req, reply) {
  try {
    const tours = await tourService.getAllTours();
    reply.send({ message: "success", tours })
  } catch (error) {
    reply.status(400).send({ error: error.message });
  }
}


async function createTour(req, reply) {
  try {
    const tour = await tourService.createTour(req.body);
    reply.status(201).send({ message: "success", tour });
  } catch (error) {
    reply.status(400).send({ error: error.message });
  }
}

async function getTour(req, reply) {
  const { id } = req.params;
  try {
    const tour = await tourService.getTourById(id);
    if (!tour) {
      reply.status(404).send({ error: "Tour not found" });
    } else {
      reply.send({ message: "success", tour });
    }
  } catch (error) {
    reply.status(400).send({ error: error.message });
  }
}

// Update a tour by ID
async function updateTour(req, reply) {
  const { id } = req.params;
  try {
    const tour = await tourService.getTourById(id);
    if (!tour) {
      reply.status(404).send({ error: "Tour not found" });
    }
    const updatedTour = await tourService.updateTour(id, req.body);
    if (!updatedTour) {
      reply.status(404).send({ error: "Error while updating" });
    } else {
      const tour = await tourService.getTourById(id);
      reply.send({ message: "success", tour })
    }
  } catch (error) {
    reply.status(400).send({ error: error.message });
  }
}

// Delete a tour by ID
async function deleteTour(req, reply) {
  const { id } = req.params;
  try {
    const deletedTour = await tourService.deleteTour(id);
    if (!deletedTour) {
      reply.status(404).send({ error: "Tour not found" });
    } else {
      reply.send({ message: "success", tour })
    }
  } catch (error) {
    reply.status(400).send({ error: error.message });
  }
}

module.exports = {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
};
