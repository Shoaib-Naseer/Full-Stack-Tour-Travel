// models/Category.js
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define("Role", {
    role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.ENUM("admin", "user"),
      allowNull: false,
    },
  });

  return Role;
};
