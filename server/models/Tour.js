// models/Tour.js
module.exports = (sequelize, DataTypes) => {
  const Tour = sequelize.define("Tour", {
    tour_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    base_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  });

  Tour.associate = function (models) {
    Tour.belongsToMany(models.Category, {
      through: "TourCategories",
      foreignKey: "tour_id",
      otherKey: "category_id",
    });
  };

  return Tour;
};
