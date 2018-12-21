module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('Organizations', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            colors: {
                type: Sequelize.STRING
            },
            default_time: {
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable('Organizations')
}