module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define("Image", {
    image_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tour_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Image.associate = function (models) {
    Image.belongsTo(models.Tour, {
      foreignKey: "tour_id",
      onDelete: "CASCADE", 
    });
  };

  return Image;
};
