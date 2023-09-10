// models/Review.js
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define("Review", {
    review_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    tour_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  Review.associate = function (models) {
    Review.belongsTo(models.Tour, {
      foreignKey: "tour_id",
      onDelete: "CASCADE", // Adjust the deletion behavior as needed
    });
    Review.belongsTo(models.User, {
      foreignKey: "user_id",
      onDelete: "CASCADE", // Adjust the deletion behavior as needed
    });
  };

  return Review;
};
