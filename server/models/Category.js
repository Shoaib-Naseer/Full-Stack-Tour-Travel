// models/Category.js
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Category.associate = function(models){
    Category.belongsToMany(models.Tour, {
      through: "TourCategories",
      foreignKey: "category_id",
      otherKey: "tour_id",
    });
  }

  return Category;
};
