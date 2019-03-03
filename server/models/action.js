module.exports = (sequelize, DataTypes) => {
  const Action = sequelize.define('Action', {
    twopt_make: DataTypes.BOOLEAN,
    threept_make: DataTypes.BOOLEAN,
    ft: DataTypes.BOOLEAN,
    twopt_miss: DataTypes.BOOLEAN,
    threept_miss: DataTypes.BOOLEAN,
    assist: DataTypes.BOOLEAN,
    turnover: DataTypes.BOOLEAN,
    off_reb: DataTypes.BOOLEAN,
    def_reb: DataTypes.BOOLEAN,
    steal: DataTypes.BOOLEAN,
    block: DataTypes.BOOLEAN,
    foul: DataTypes.BOOLEAN
  }, {
    timestamps: false,
  });

  Action.associate = (models) => {
    Action.belongsTo(models.Organization, {
      // through: models.Organization,
      foreignKey: "id"
      // onDelete: "CASCADE",
    })
  };

  return Action;
};