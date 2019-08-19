const schedule = require('node-schedule')
const axios = require('axios')
const apiKey = process.env.WINDY_API_KEY
const wunderGroundApiKey = process.env.WUNDERGROUND_API_KEY
const stations = [
  {
    windyId: 0,
    wundergroundName: 'KCOBOULD45'
  },
  {
    windyId: 1,
    wundergroundName: 'KCOBOULD442'
  }
]

const j = schedule.scheduleJob('10 */5 * * * *', async function () {
  console.log(new Date())
  const observations = await getWeatherData(stations[0].wundergroundName)
  await sendWeatherData(stations[0], observations)
})

const j2 = schedule.scheduleJob('15 */5 * * * *', async function () {
  console.log(new Date())
  const observations = await getWeatherData(stations[1].wundergroundName)
  await sendWeatherData(stations[1], observations)
})

async function getWeatherData (wundergroundName) {
  try {
    const resultImperial = await axios.get(`https://api.weather.com/v2/pws/observations/current?apiKey=${wunderGroundApiKey}&stationId=${wundergroundName}&numericPrecision=decimal&format=json&units=e`)
    const resultMetric = await axios.get(`https://api.weather.com/v2/pws/observations/current?apiKey=${wunderGroundApiKey}&stationId=${wundergroundName}&numericPrecision=decimal&format=json&units=m`)
    return [resultImperial.data.observations[0], resultMetric.data.observations[0]]
  } catch (error) {
    console.error(`Get Data Failed: ${error}`)
  }
}

async function sendWeatherData (station, observations) {
  try {
    const imperialObservation = observations[0]
    const metricObservation = observations[1]
    const params = {
      observations: [{
        station: station.windyId,
        dateutc: imperialObservation.obsTimeUtc.replace('Z', ''),
        tempf: imperialObservation.imperial.temp,
        windspeedmph: imperialObservation.imperial.windSpeed,
        winddir: imperialObservation.winddir,
        windgustmph: imperialObservation.imperial.windGust,
        baromin: imperialObservation.imperial.pressure,
        rh: imperialObservation.humidity,
        dewpoint: metricObservation.metric.dewpt
      }]
    }
    const result = await axios.post(`https://stations.windy.com/pws/update/${apiKey}`, params)
    console.log(`${station.wundergroundName} Observation Posted ${new Date()}`)
    console.log(observations)
    console.log(params.observations[0])

    return result
  } catch (error) {
    console.error(`Send Data Failed: ${error}`)
  }
}
