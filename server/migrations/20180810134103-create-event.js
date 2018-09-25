module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('Events', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            action_id: {
                type: Sequelize.STRING,
                // references: {
                //     model: 'Actions',
                //     key: 'id',
                //     as: 'action_id',
                // },
            },
            player_id: {
                type: Sequelize.INTEGER,
                onDelete: 'cascade',
                references: {
                    model: 'Players',
                    key: 'id',
                    as: 'player_id',
                },
            },
            team_id: {
                type: Sequelize.INTEGER,
                onDelete: 'cascade',
                references: {
                    model: 'Teams',
                    key: 'id',
                    as: 'team_id',
                },
            },
            drill_id: {
                type: Sequelize.INTEGER,
                onDelete: 'cascade',
                references: {
                    model: 'Drills',
                    key: 'id',
                    as: 'drill_id',
                },
            },
            location: {
                type: Sequelize.JSON,
            },
            timestamp: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                field: "created_at"
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                field: "updated_at"
            }
        }),
    down: (queryInterface, Sequelize) => queryInterface.dropTable('Events')
}