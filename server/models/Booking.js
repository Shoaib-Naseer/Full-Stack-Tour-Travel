module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define("Booking", {
    booking_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    group_size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    payment_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tour_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
    Booking.belongsTo(models.User, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
    });
    Booking.belongsTo(models.Payment, {
      foreignKey: "payment_id",
      onDelete: "CASCADE",
    });
    Booking.belongsTo(models.Tour, {
      foreignKey: "tour_id",
      onDelete: "CASCADE",
    });

  };
  return Booking;
};
