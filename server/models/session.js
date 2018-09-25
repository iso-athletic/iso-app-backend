module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE
  },{
    createdAt: "created_at",
    updatedAt: "updated_at"
  });

  Session.associate = (models) => {
    Session.hasMany(models.Drill, {
      foreignKey: 'session_id',
      as: 'drills',
      onDelete: 'CASCADE',
      hooks: true
    });
    Session.belongsTo(models.Organization, {
      foreignKey: 'organization_id',
      onDelete: 'CASCADE',
    });
  };
  return Session;
};