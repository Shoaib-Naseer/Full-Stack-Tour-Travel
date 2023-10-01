// models/TourCategories.js
module.exports = (sequelize, DataTypes) => {
    const TourCategories = sequelize.define("TourCategories", {
      // You can include any additional fields you may need in the junction table
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    });
  
    TourCategories.associate = (models) => {
        TourCategories.belongsTo(models.Tour, {
          foreignKey: "tour_id",
          onDelete: "CASCADE",
        });
    
        TourCategories.belongsTo(models.Category, {
          foreignKey: "category_id",
          onDelete: "CASCADE",
        });
      };

    return TourCategories;
  };
  