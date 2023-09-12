const categoryService = require('../services/categoryService');

async function getAllCategories(req, reply) {
  try {
    const categories = await categoryService.getAllCategories();
    reply.send(categories);
  } catch (error) {
    reply.status(400).send({ error: 'Failed to fetch categories' });
  }
}

async function createCategory(req, reply) {
  const { name } = req.body;

  try {
    const category = await categoryService.createCategory(name);
    reply.status(201).send(category);
  } catch (error) {
    reply.status(400).send({ error: 'Failed to create category' });
  }
}

async function updateCategory(req, reply) {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const isUpdated = await categoryService.updateCategory(id, name);

    if (isUpdated) {
      reply.send({ message: 'Category updated successfully' });
    } else {
      reply.status(404).send({ error: 'Category not found' });
    }
  } catch (error) {
    reply.status(400).send({ error: 'Failed to update category' });
  }
}

async function getCategory(req, reply) {
    const { id } = req.params;
  
    try {
      const category = await categoryService.getCategory(id);
  
      if (category) {
        reply.send(category);
      } else {
        reply.status(404).send({ error: 'Category not found' });
      }
    } catch (error) {
      reply.status(400).send({ error: 'Failed to Find category' });
    }
  }

  async function deleteCategory(req, reply) {
    const { id } = req.params;
    try {
        const category = await categoryService.getCategory(id);
        if (category) {
          const message = await categoryService.deleteCategory(id)
          reply.send(message)
        } else {
          reply.status(404).send({ error: 'Category not found' });
        }
      } catch (error) {
        reply.status(400).send({ error: 'Failed to Find category' });
      }
  }

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  getCategory,
  deleteCategory
};
