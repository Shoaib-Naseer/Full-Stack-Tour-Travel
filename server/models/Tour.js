// models/Tour.js
module.exports = (sequelize, DataTypes) => {
  const Tour = sequelize.define("Tour", {
    basic_tour_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tour_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    limit:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    booking_start_date: {
      type: DataTypes.DATE,
      defaultValue: () => new Date(),
    },
    booking_end_date: {
      type: DataTypes.DATE,
    },
  });

  Tour.associate = function (models) {

    Tour.hasMany(models.Image, {
      foreignKey: 'tour_id',
      onDelete: 'CASCADE',
    });

    Tour.belongsTo(models.BasicTour, {
      foreignKey: "basic_tour_id",
      onDelete: "CASCADE",  
    });

    Tour.belongsToMany(models.PickupLocation, {
      through: "TourPickupLocations",
      foreignKey: 'tour_id',
      otherKey: "pickup_location_id",
    });

    Tour.belongsToMany(models.Category, {
      through: "TourCategories",
      foreignKey: 'tour_id',
      otherKey: "category_id",
    });

    
  };

  return Tour;
};
