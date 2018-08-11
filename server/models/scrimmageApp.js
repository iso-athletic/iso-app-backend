module.exports = (sequelize, DataTypes) => {
  const ScrimmageApp = sequelize.define('ScrimmageApp', {
    type: DataTypes.STRING,
    session_id: DataTypes.INTEGER,
    timer_duration: DataTypes.FLOAT,
    team_roster: DataTypes.ARRAY(DataTypes.STRING),
    actions: DataTypes.ARRAY(DataTypes.STRING)
  },{
    createdAt: "created_at",
    updatedAt: "updated_at"
  });

  ScrimmageApp.associate = (models) => {
    ScrimmageApp.belongsTo(models.Session, {
      foreignKey: 'session_id',
      onDelete: 'CASCADE',
    });
  };
  return ScrimmageApp;
};