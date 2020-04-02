const { Station } = require('../models')
const { Reading } = require('../models')
const axios = require('axios')
const wunderGroundApiKey = process.env.WUNDERGROUND_API_KEY

async function main () {
  const results = await Station.findAll()

  for (const station of results) {
    const obsResult = await axios.get(`https://api.weather.com/v2/pws/observations/current?apiKey=${wunderGroundApiKey}&stationId=${station.code}&numericPrecision=decimal&format=json&units=e`)

    const observation = obsResult.data.observations[0]

    const result = await Reading.create({
      stationId: station.id,
      observationTimeUTC: observation.obsTimeUtc,
      humidity: observation.humidity,
      tempFahrenheit: observation.imperial.temp,
      dewPoint: observation.imperial.dewpt,
      windSpeedMPH: observation.imperial.windSpeed,
      windGustMPH: observation.imperial.windGust,
      pressureInchesHg: observation.imperial.pressure,
      windDir: observation.winddir
    })

    console.log(result.toJSON())
  }

  process.exit()
}

main().catch((error) => {
  throw error
})
