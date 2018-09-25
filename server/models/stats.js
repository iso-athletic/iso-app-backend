module.exports = (sequelize, DataTypes) => {
  const Stats = sequelize.define('Stats', {
    player_name: DataTypes.STRING,
    date_scrimmage: DataTypes.DATE,
    drill_id: DataTypes.BIGINT,
    fg: DataTypes.BIGINT,
    fga: DataTypes.BIGINT,
    'fg%': DataTypes.DOUBLE,
    '2p': DataTypes.BIGINT,
    '2pa': DataTypes.BIGINT,
    '2p%': DataTypes.DOUBLE,
    '3p': DataTypes.BIGINT,
    '3pa': DataTypes.BIGINT,
    '3p%': DataTypes.DOUBLE,
    '3par': DataTypes.DOUBLE,
    pts: DataTypes.BIGINT,
    'ts%': DataTypes.DOUBLE,
    'efg%': DataTypes.DOUBLE,
    ft: DataTypes.BIGINT,
    fta: DataTypes.BIGINT,
    'ft%': DataTypes.DOUBLE,
    ftr: DataTypes.BIGINT,
    oreb: DataTypes.BIGINT,
    dreb: DataTypes.BIGINT,
    reb: DataTypes.BIGINT,
    ast: DataTypes.BIGINT,
    stl: DataTypes.BIGINT,
    blk: DataTypes.BIGINT,
    tov: DataTypes.BIGINT,
    pf: DataTypes.BIGINT
  },{
    createdAt: "created_at",
    updatedAt: "updated_at"
  });

  Stats.associate = (models) => {
    Stats.belongsTo(models.Drill, {
      foreignKey: 'drill_id',
      onDelete: 'CASCADE',
    });
    Stats.belongsTo(models.Player, {
      foreignKey: 'player_id',
      onDelete: 'CASCADE',
    });
  };
  return Stats;
};
