const categoryService = require("../services/categoryService");

async function getAllCategories(req, reply) {
  try {
    const categories = await categoryService.getAllCategories();
    reply.send({ message: "success", data: { categories } });
  } catch (error) {
    reply.code(400).send({ message: "failure", error: error.message });
  }
}

async function createCategory(req, reply) {
  const { name } = req.body;
  try {
    const category = await categoryService.createCategory(name);
    reply.status(201).send({ message: "success", data: { category } });
  } catch (error) {
    reply.code(400).send({ message: "failure", error: error.message });
  }
}

async function updateCategory(req, reply) {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const category = await categoryService.updateCategory(id, name);
    if (category) {
      reply.send({ message: "success", data: { category } });
    } else {
      reply.status(404).send({ error: "Category not found" });
    }
  } catch (error) {
    reply.code(400).send({ message: "failure", error: error.message });
  }
}

async function getCategory(req, reply) {
  const { id } = req.params;
  try {
    const category = await categoryService.getCategory(id);

    if (category) {
      reply.send({ message: "success", data: { category } });
    } else {
      reply
        .status(404)
        .send({ message: "failure", error: "Category not found" });
    }
  } catch (error) {
    reply.code(400).send({ message: "failure", error: error.message });
  }
}

async function deleteCategory(req, reply) {
  const { id } = req.params;
  try {
    const category = await categoryService.getCategory(id);
    if (category) {
      await categoryService.deleteCategory(id);
      reply.send({ message: "success", data: { category } });
    } else {
      reply
        .status(404)
        .send({ message: "failure", error: "Category not found" });
    }
  } catch (error) {
    reply.code(400).send({ message: "failure", error: error.message });
  }
}

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  getCategory,
  deleteCategory,
};
