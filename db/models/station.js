module.exports = (sequelize, DataTypes) => {
  const Station = sequelize.define('Station', {
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    latitude: DataTypes.DOUBLE,
    longitude: DataTypes.DOUBLE,
    elevation: DataTypes.DOUBLE,
    height: DataTypes.DOUBLE,
    sourceType: {
      type: DataTypes.ENUM('WUNDERGROUND', 'MESOWEST', 'NCAR')
    }
  }, {
    underscored: true,
    tableName: 'stations'
  })
  Station.associate = function (models) {
    Station.hasMany(models.Reading, {
      foreignKey: 'stationId'
    })
  }
  return Station
}
