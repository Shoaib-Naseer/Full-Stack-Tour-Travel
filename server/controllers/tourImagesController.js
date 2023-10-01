const tourImageService = require("../services/tourImageService.js");
const tourService = require("../services/tourService.js");

// Upload an image for a tour
async function uploadImages(req, reply) {
  try {
    const files = req.raw.files;
    const { tourId } = req.params;
    const tour = await tourService.getTourById(tourId)
    if(!tour){
      reply.status(404).send({ message: "failure",error:"Tour not Found" });
    }
    const images = await tourImageService.uploadImage(files, tourId);
    reply.status(201).send({ message: "success", data: { images } });
  } catch (error) {
    reply.status(400).send({ message: "failure", error: error.message });
  }
}

// Get a all images for a single tour
async function getAllImagesForTour(req, reply) {
  try {
    const { tourId } = req.params;
    const tour = await tourService.getTourById( tourId );
    if (!tour)
      return reply
        .status(404)
        .send({ message: "failure", error: "Tour not found" });
    const images = await tourImageService.getAllImagesForTour(tourId);
    reply.send({ message: "success", data: { images } });
  } catch (error) {
    reply.status(400).send({ message: "failure", error: error.message });
  }
}

// Get all images
async function getAllImages(req, reply) {
  try {
    const images = await tourImageService.getAllImages();
    reply.send({ message: "success", data: { images } });
  } catch (error) {
    reply.status(400).send({ message: "failure", error: error.message });
  }
}

// Delete an image for a tour
async function deleteSingleTourImage(req, reply) {
  try {
    const { tourId, imageId } = req.params;
    const tourExists = await tourService.getTourById(tourId);
    if (!tourExists)
      return reply
        .status(404)
        .send({ message: "failure", error: "Tour not found" });
    const imageExists = await tourImageService.getSingleImageById(imageId);
    if (!imageExists)
      return reply
        .status(404)
        .send({ message: "failure", error: "Image not found" });
    const image = await tourImageService.deleteSingleImage(imageId);
    reply.send({ message: "success", data: { image } });
  } catch (error) {
    reply.status(400).send({ message: "failure", error: error.message });
  }
}

async function deleteAllTourImages(req, reply) {
  try {
    const { tourId } = req.params;
    const tour = await tourService.getTourById(tourId);
    if (!tour)
      return reply
        .status(404)
        .send({ message: "failure", error: "Tour not found" });

    const images = await tourImageService.deleteAllTourImages(tourId);
    reply.send({ message: "success", data: { images } });
  } catch (error) {
    reply.status(400).send({ message: "failure", error: error.message });
  }
}

module.exports = {
  uploadImages,
  deleteSingleTourImage,
  deleteAllTourImages,
  getAllImagesForTour,
  getAllImages,
};
