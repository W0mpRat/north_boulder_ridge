const { Station, Reading } = require('../db/models')
const express = require('express')
const cors = require('cors')
const { Op } = require('sequelize')
const app = express()
const port = 3000

app.use(cors())
app.get('/', (req, res) => res.send('Weather API is running.'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

app.get('/stations', async function (req, res) {
  const stations = await Station.findAll({
    include: [{
      model: Reading,
      where: {
        observationTimeUTC: {
          [Op.gte]: new Date(new Date() - 8 * 60 * 60 * 1000)
        }
      }
    }]
  })

  res.send(stations)
})
