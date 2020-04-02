const { Reading } = require('../models')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint(Reading.tableName, ['station_id', 'observation_time_utc'], {
      type: 'unique',
      name: 'unique_station_id_time'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(Reading.tableName, 'unique_station_id_time')
  }
}
