module.exports = (sequelize, DataTypes) => {
  const Reading = sequelize.define('Reading', {
    humidity: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    observationTimeUTC: {
      type: DataTypes.DATE,
      field: 'observation_time_utc',
      allowNull: false
    },
    tempFahrenheit: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    dewPoint: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    windDir: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    windSpeedMPH: {
      type: DataTypes.DOUBLE,
      field: 'wind_speed_mph',
      allowNull: false
    },
    windGustMPH: {
      type: DataTypes.DOUBLE,
      field: 'wind_gust_mph',
      allowNull: false
    },
    pressureInchesHg: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    name: {
      singular: 'reading',
      plural: 'readings'
    },
    underscored: true,
    tableName: 'readings',
    updatedAt: false
  })
  Reading.associate = function (models) {
    Reading.belongsTo(models.Station, {
      foreignKey: 'stationId'
    })
  }

  Reading.indexes = [{ unique: true, fields: ['stationId', 'observationTimeUTC'] }]

  return Reading
}
