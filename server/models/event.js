module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('Event', {
      action_id: DataTypes.STRING,
      player_id: DataTypes.INTEGER,
      team_id: DataTypes.INTEGER,
      drill_id: DataTypes.INTEGER,
      location: DataTypes.JSON,
      timestamp: DataTypes.STRING,
    },{
      createdAt: "created_at",
      updatedAt: "updated_at"
    });
  
    Event.associate = (models) => {
      Event.belongsTo(models.Drill, {
        foreignKey: 'drill_id'
      });
    };
    return Event;
  };