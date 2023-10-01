const fs = require("fs");
const Path = require("path");
const { Image } = require("../models");

async function getAllImagesForTour(tourId) {
  const images = await Image.findAll({
    where: { tour_id: tourId },
  });
  return images;
}

async function getAllImages() {
  try {
    const images = await Image.findAll();
    return images;
  } catch (error) {
    throw new Error(`Failed to retrieve images: ${error.message}`);
  }
}

async function getSingleImageById(imageId) {
    const image = await Image.findOne({ where: { image_id: imageId } });
    return image;
  
}

async function uploadImage(files, tourId) {
  try {
    const dirPath = Path.join(__dirname, "..", `uploads/tours`);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    const savedFiles = [];
    for (const fieldName in files) {
      const file = files[fieldName];

      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const filePath = Path.join(dirPath, `${uniqueSuffix}-${file.name}`);

      await file.mv(filePath);
      const img = await Image.create({
        tour_id: tourId,
        url: filePath,
      });
      savedFiles.push(img);
    }
    return savedFiles;
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteSingleImage(imageId) {
  try {
    const image = await Image.findOne({ where: { image_id: imageId } });
    if (!image) {
      throw new Error(`Image with ID ${imageId} not found`);
    }
    const imageUrl = image.url;
    await image.destroy();

    fs.unlink(imageUrl, (err) => {
      if (err) console.log(err);
    });

    return image;
  } catch (error) {
    throw new Error(`Failed to delete image: ${error.message}`);
  }
}

async function deleteAllTourImages(tourId) {
  try {
    const imagesToDelete = await Image.findAll({
      where: { tour_id: tourId },
    });
    const deletedImageUrls = [];
    for (const image of imagesToDelete) {
      const imageUrl = image.url;
      await image.destroy();
      // Delete the image file from the server
      fs.unlink(imageUrl, (err) => {
        if (err) console.log(err);
      });

      deletedImageUrls.push(imageUrl);
    }
    return imagesToDelete;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to delete all images: ${error.message}`);
  }
}

module.exports = {
  uploadImage,
  deleteAllTourImages,
  deleteSingleImage,
  getAllImagesForTour,
  getAllImages,
  getSingleImageById
};
