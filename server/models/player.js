module.exports = (sequelize, DataTypes) => {
    const Player = sequelize.define('Player', {
      name: DataTypes.STRING,
      jersey_number: DataTypes.INTEGER,
      organization_id: DataTypes.INTEGER,
    },{
      createdAt: "created_at",
      updatedAt: "updated_at"
    });
  
    Player.associate = (models) => {
      Player.belongsTo(models.Organization, {
        foreignKey: 'organization_id'
      });
    };
    return Player;
  };