module.exports = (sequelize, DataTypes) => {
    const Team = sequelize.define('Team', {
      name: DataTypes.STRING,
      player1_id: DataTypes.INTEGER,
      player2_id: DataTypes.INTEGER,
      player3_id: DataTypes.INTEGER,
      player4_id: DataTypes.INTEGER,
      player5_id: DataTypes.INTEGER,
      drill_id: DataTypes.INTEGER,
    },{
      createdAt: "created_at",
      updatedAt: "updated_at"
    });
  
    Team.associate = (models) => {
      Team.belongsTo(models.Drill, {
        foreignKey: 'drill_id',
        onDelete: 'CASCADE',
      });
      Team.hasOne(models.Player, {
        foreignKey: 'player1_id',
        as: 'player1'
      });
      Team.hasOne(models.Player, {
        foreignKey: 'player2_id',
        as: 'player2'
      });
      Team.hasOne(models.Player, {
        foreignKey: 'player3_id',
        as: 'player3'
      });
      Team.hasOne(models.Player, {
        foreignKey: 'player4_id',
        as: 'player4'
      });
      Team.hasOne(models.Player, {
        foreignKey: 'player5_id',
        as: 'player5'
      });
    };
    return Team;
  };