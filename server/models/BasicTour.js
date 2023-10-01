// models/BasicTour.js
module.exports = (sequelize, DataTypes) => {
  const BasicTour = sequelize.define("BasicTour", {
    basic_tour_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  BasicTour.associate = function (models) {
    BasicTour.hasMany(models.Tour, {
      as: "Tours",
      foreignKey: "basic_tour_id",
    });
  };

  return BasicTour;
};
