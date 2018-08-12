module.exports = (sequelize, DataTypes) => {
  const Action = sequelize.define('Action', {
    type: DataTypes.STRING,
  },{
    createdAt: "created_at",
    updatedAt: "updated_at"
  });

  return Action;
};