const categoryService = require("../services/categoryService");

async function getAllCategories(req, reply) {
  try {
    const categories = await categoryService.getAllCategories();
    reply.send(categories);
  } catch (error) {
    reply.status(400).send({ error });
  }
}

async function createCategory(req, reply) {
  const { name } = req.body;
  try {
    const category = await categoryService.createCategory(name);
    
    reply.status(201).send(category);
  } catch (error) {
    reply.status(400).send({ error:error.message });
  }
}

async function updateCategory(req, reply) {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const category = await categoryService.updateCategory(id, name);
    if (category) {
      reply.send("Category Updated");
    } else {
      reply.status(404).send({ error: "Category not found" });
    }
  } catch (error) {
    reply.status(400).send({ error });
  }
}

async function getCategory(req, reply) {
  const { id } = req.params;
  try {
    const category = await categoryService.getCategory(id);

    if (category) {
      reply.send(category);
    } else {
      reply.status(404).send({ error: "Category not found" });
    }
  } catch (error) {
    reply.status(400).send({ error: "Failed to Find category" });
  }
}

async function deleteCategory(req, reply) {
  const { id } = req.params;
  try {
    const category = await categoryService.getCategory(id);
    if (category) {
      await categoryService.deleteCategory(id);
      reply.send(category);
    } else {
      reply.status(404).send({ error: "Category not found" });
    }
  } catch (error) {
    reply.status(400).send({ error:error.message });
  }
}

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  getCategory,
  deleteCategory,
};
