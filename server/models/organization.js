module.exports = (sequelize, DataTypes) => {
    const Organization = sequelize.define('Organization', {
        name: DataTypes.STRING,
        colors: DataTypes.STRING,
        logo: DataTypes.STRING,
        default_time: DataTypes.STRING,
    }, {
        createdAt: "created_at",
        updatedAt: "updated_at"
    });

    Organization.associate = (models) => {
        Organization.hasMany(models.Session, {
            foreignKey: 'organization_id',
            as: 'sessions',
        });
        Organization.hasMany(models.Player, {
            foreignKey: 'organization_id',
            as: 'players',
        });
        Organization.hasOne(models.Action, {
            foreignKey: 'id',
            as: 'actions',
        })
    };
    return Organization;
};