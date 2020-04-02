const { Station } = require('../models')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(Station.tableName, [{
      code: 'KCOBOULD45',
      name: 'North Boulder Ridge',
      latitude: 40.05619,
      longitude: -105.301689,
      elevation: 6500,
      height: 25,
      source_type: 'WUNDERGROUND',
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
}
