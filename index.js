const schedule = require('node-schedule');
const axios = require('axios');
const windyStationId = 0
const apiKey = process.env.WINDY_API_KEY

const j = schedule.scheduleJob('10 */5 * * * *', async function () {
  console.log(new Date())
  const observations = await getWeatherData()
  await sendWeatherData(observations)
});

async function getWeatherData () {
  try {
    const resultImperial = await axios.get('https://api.weather.com/v2/pws/observations/current?apiKey=6532d6454b8aa370768e63d6ba5a832e&stationId=KCOBOULD45&numericPrecision=decimal&format=json&units=e')
    const resultMetric = await axios.get('https://api.weather.com/v2/pws/observations/current?apiKey=6532d6454b8aa370768e63d6ba5a832e&stationId=KCOBOULD45&numericPrecision=decimal&format=json&units=m')
    return [resultImperial.data.observations[0], resultMetric.data.observations[0]]
  } catch (error) {
    console.error(`Get Data Failed: ${error}`)
  }
}

async function sendWeatherData (observations) {
  try {
    const imperialObservation = observations[0]
    const metricObservation = observations[1]
    const params = {
      observations: [{
        station: 0,
        dateutc: imperialObservation.obsTimeUtc.replace('Z', ''),
        tempf: imperialObservation.imperial.temp,
        windspeedmph : imperialObservation.imperial.windSpeed,
        winddir: imperialObservation.winddir,
        windgustmph: imperialObservation.imperial.windGust,
        baromin: imperialObservation.imperial.pressure,
        rh: imperialObservation.humidity,
        dewpoint: metricObservation.metric.dewpt
      }]
    }
    const result = await axios.post(`https://stations.windy.com/pws/update/${apiKey}`, params)
    console.log(`Observation Posted ${new Date()}`)
    console.log(observations)
    console.log(params.observations[0])

    return result
  } catch (error) {
    console.error(`Send Data Failed: ${error}`)
  }
}
