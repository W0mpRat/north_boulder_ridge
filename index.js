const schedule = require('node-schedule');
const axios = require('axios');
const windyStationId = 0
const apiKey = process.env.WINDY_API_KEY

const j = schedule.scheduleJob('*/2 * * * * *', async function () {
  const observation = await getWeatherData()
  await sendWeatherData(observation)
});

async function getWeatherData () {
  try {
    const result = await axios.get('https://api.weather.com/v2/pws/observations/current?apiKey=6532d6454b8aa370768e63d6ba5a832e&stationId=KCOBOULD45&numericPrecision=decimal&format=json&units=m')
    const observation = result.data.observations[0]
    return observation
  } catch (error) {
    throw error
  }
}

async function sendWeatherData (observation) {
  try {
    const params = {
      observations: [{
        station: 0,
        dateutc: observation.obsTimeUtc.replace('Z', ''),
        temp: observation.metric.temp,
        wind: observation.metric.windSpeed,
        winddir: observation.winddir,
        gust: observation.metric.windGust,
        rh: observation.humidity,
        dewpoint: observation.metric.dewpt
      }]
    }
    const result = await axios.post(`https://stations.windy.com/pws/update/${apiKey}`, params)
    console.log(`Observation Posted ${new Date()}`)
    console.log(params.observations[0])

    return result
  } catch (error) {
    throw error
  }
}

getWeather = async () => {
  let res = await axios.get("https://reqres.in/api/users?page=1");
  return res
}