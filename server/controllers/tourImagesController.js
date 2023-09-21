const tourImageService = require("../services/tourImageService.js");
const tourService = require("../services/tourService.js");

// Upload an image for a tour
async function uploadImages(req, reply) {
  try {
    const files = req.raw.files;
    const { tourId } = req.params;
    const images = await tourImageService.uploadImage(files, tourId);
    reply.status(201).send({ message: "success", images });
  } catch (error) {
    console.error("Error uploading files:", error);
    reply.status(400).send({ error: "Error uploading files:" });
  }
}

// Get a all images for a single tour
async function getAllImagesForTour(req, reply) {
  try {
    const { tourId } = req.params;
    const images = await tourImageService.getAllImagesForTour(tourId);
    if (!images) {
      reply.status(404).send({ error: "Image not found" });
    } else {
      reply.send({ message: "success", images });
    }
  } catch (error) {
    reply.status(400).send({ error:error.message });
  }
}

// Get all images
async function getAllImages(req, reply) {
  try {
    const images = await tourImageService.getAllImages();
  if (!images) {
    reply.status(404).send({ error: "Images not found" });
  } else {
    reply.send({message: "success",images});
  }
  } catch (error) {
    reply.status(400).send({ error:error.message });
  }
}

// Delete an image for a tour
async function deleteSingleTourImage(req, reply) {
  try {
    const { tourId, imageId } = req.params;
    const tour = await tourService.getTourById(tourId);
    if (!tour) {
      reply.status(404).send({ error: "Tour not found" });
    }
    const images = await tourImageService.deleteSingleImage(imageId);
    if (!images) {
      reply.status(404).send({ error: "Image not found" });
    } else {
      reply.send({ message: "success" , images});
    }
  } catch (error) {
    reply.status(400).send({ error: error.message });
  }
}

async function deleteAllTourImages(req, reply) {
  try {
    const { tourId } = req.params;
    const tour = await tourService.getTourById(tourId);
    if (!tour) {
      reply.status(404).send({ error: "Tour not found" });
    }
    const images = await tourImageService.deleteAllTourImages(tourId);
    if (!images) {
      reply.status(404).send({ error: "Image not found" });
    } else {
      reply.send({ message: "success", images});
    }
  } catch (error) {
    reply.status(400).send({ error: error.message });
  }
}

module.exports = {
  uploadImages,
  deleteSingleTourImage,
  deleteAllTourImages,
  getAllImagesForTour,
  getAllImages
};
