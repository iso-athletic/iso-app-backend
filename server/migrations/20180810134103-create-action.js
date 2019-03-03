module.exports = {
    up: (queryInterface, Sequelize) =>
      queryInterface.createTable('Actions', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          references: {
            model: 'Organizations',
            key: 'id',
            as: 'organization_id',
          },
        },
        twopt_make: {
          allowNull: false,
          type: Sequelize.BOOLEAN
        },
        threept_make: {
          allowNull: false,
          type: Sequelize.BOOLEAN
        },
        ft: {
          allowNull: false,
          type: Sequelize.BOOLEAN
        },
        twopt_miss: {
          allowNull: false,
          type: Sequelize.BOOLEAN
        },
        threept_miss: {
          allowNull: false,
          type: Sequelize.BOOLEAN
        },
        assist: {
          allowNull: false,
          type: Sequelize.BOOLEAN
        },
        turnover: {
          allowNull: false,
          type: Sequelize.BOOLEAN
        },
        off_reb: {
          allowNull: false,
          type: Sequelize.BOOLEAN
        },
        def_reb: {
          allowNull: false,
          type: Sequelize.BOOLEAN
        },
        steal: {
          allowNull: false,
          type: Sequelize.BOOLEAN
        },
        block: {
          allowNull: false,
          type: Sequelize.BOOLEAN
        },
        foul: {
          allowNull: false,
          type: Sequelize.BOOLEAN
        },
      }),
    down: (queryInterface, Sequelize) => queryInterface.dropTable('Actions')
  }