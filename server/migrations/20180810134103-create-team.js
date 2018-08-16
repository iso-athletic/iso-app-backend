module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      player1_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Players',
          key: 'id',
          as: 'player_id',
        },
      },
      player2_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Players',
          key: 'id',
          as: 'player_id',
        },
      },
      player3_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Players',
          key: 'id',
          as: 'player_id',
        },
      },
      player4_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Players',
          key: 'id',
          as: 'player_id',
        },
      },
      player5_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Players',
          key: 'id',
          as: 'player_id',
        },
      },
      drill_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Drills',
          key: 'id',
          as: 'drill_id',
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Teams')
}