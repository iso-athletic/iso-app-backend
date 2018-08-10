module.exports = {
    up: (queryInterface, Sequelize) =>
      queryInterface.createTable('Players', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING
        },
        jersey_number: {
            type: Sequelize.INTEGER
        },
        organization_id: {
          type: Sequelize.INTEGER,
          onDelete: 'CASCADE',
          references: {
            model: 'Organizations',
            key: 'id',
            as: 'organization_id',
          },
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable('Players')
  }