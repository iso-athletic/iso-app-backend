module.exports = (sequelize, DataTypes) => {
  const Drill = sequelize.define('Drill', {
    type: DataTypes.STRING,
    session_id: DataTypes.INTEGER,
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE
  },{
    createdAt: "created_at",
    updatedAt: "updated_at"
  });

  Drill.associate = (models) => {
    Drill.belongsTo(models.Session, {
      foreignKey: 'session_id',
      onDelete: 'CASCADE',
    });
    Drill.hasMany(models.Team, {
      foreignKey: 'drill_id',
      as: 'teams',
    });
    Drill.hasMany(models.Event, {
      foreignKey: 'drill_id',
      as: 'events',
      onDelete: 'CASCADE',
      hooks: true
    });
  };
  return Drill;
};