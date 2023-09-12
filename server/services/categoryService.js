const {Category} = require('../models');

async function getAllCategories() {
  return Category.findAll();
}

async function createCategory(name) {
  return Category.create({ name });
}

async function updateCategory(id, name) {
  const [updatedRows] = await Category.update({ name }, { where: { category_id: id } });
  return updatedRows > 0;
}

async function getCategory(id) {
    const category = await Category.findOne({ where: { category_id: id } });
    return category;
  }

  async function deleteCategory(id) {
    const category = await Category.findByPk(id);
    await category.destroy();
    return { message: 'Category deleted successfully' };
  }

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  getCategory,
  deleteCategory
};
