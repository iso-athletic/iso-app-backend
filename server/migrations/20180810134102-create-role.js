module.exports = {
    up: (queryInterface, Sequelize) =>
      queryInterface.createTable('Roles', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        type: {
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable('Roles')
  }