// models/TourCategories.js
module.exports = (sequelize, DataTypes) => {
  const TourPickupLocations = sequelize.define("TourPickupLocations", {
    // You can include any additional fields you may need in the junction table
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    additional_cost: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
    },
  });

  TourPickupLocations.associate = (models) => {
    TourPickupLocations.belongsTo(models.Tour, {
      foreignKey: "tour_id",
      onDelete: "CASCADE",
    });

    TourPickupLocations.belongsTo(models.PickupLocation, {
      foreignKey: "pickup_location_id",
      onDelete: "CASCADE",
    });
  };

  return TourPickupLocations;
};
