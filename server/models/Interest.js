module.exports = (Sequelize , DataTypes)=>{
    const Interest = Sequelize.define('Interest', {
        interest_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
        },
      });   
      return Interest;
}