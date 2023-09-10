// models/PickupLocation.js
module.exports = (sequelize, DataTypes) => {
    const PickupLocation = sequelize.define('PickupLocation', {
      pickup_location_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
      },
      // Other attributes related to pickup locations...
    });
  
    return PickupLocation;
  };
  