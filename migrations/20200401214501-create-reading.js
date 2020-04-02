const { Reading } = require('../models')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(Reading.tableName, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      station_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'stations',
          key: 'id',
          as: 'station_id'
        }
      },
      humidity: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      observation_time_utc: {
        type: Sequelize.DATE,
        allowNull: false
      },
      temp_fahrenheit: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      dew_point: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      wind_dir: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      wind_speed_mph: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      wind_gust_mph: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      pressure_inches_hg: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(Reading.tableName)
  }
}
