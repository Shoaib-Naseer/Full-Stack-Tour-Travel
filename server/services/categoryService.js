const { Category } = require("../models");

async function getAllCategories() {
  return Category.findAll();
}

async function createCategory(name) {
  return Category.create({ name });
}

async function updateCategory(id, name) {
  const [, updatedRows] = await Category.update(
    { name },
    { where: { category_id: id }, returning: true }
  );

  if (updatedRows.length > 0) {
    const updatedCategory = updatedRows[0].get({ plain: true });
    return updatedCategory;
  } else {
    return null;
  }
}


async function getCategory(id) {
  let category = await Category.findOne({ where: { category_id: id } });
  return category;
}

async function deleteCategory(id) {
  const category = await Category.findOne({ where: { category_id: id } });
  await category.destroy();
  return category;
}

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  getCategory,
  deleteCategory,
};
