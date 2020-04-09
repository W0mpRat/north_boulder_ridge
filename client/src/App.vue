<template>
  <div id="app">
    <p>
      <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
        Show Chart(s)
      </button>
    </p>
    <div class="collapse" id="collapseExample">
      <div class="card card-body">
        <canvas id="planet-chart"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js'
import planetChartData from './chart-data.js'
import StationService from './services/StationService'

export default {
  data () {
    return {
      planetChartData: planetChartData
    }
  },
  name: 'App',
  components: {
  },
  methods: {
    createChart (chartId, chartData) {
      const windData = chartData.readings.map(x => {
        return { x: x.observationTimeUTC, y: x.windDir }
      })
      const ctx = document.getElementById(chartId)

      // windData = [{ x: 1, y: 3 }, { x: 2, y: 2 }]

      // eslint-disable-next-line no-unused-vars
      const myChart = new Chart(ctx, {
        type: 'scatter',
        data: {
          datasets: [{
            label: 'Wind Dir',
            data: windData,
            borderColor: 'rgb(255, 99, 132)'
          }]
        },
        options: {
          aspectRatio: 3,
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              type: 'time',
              time: {
                unit: 'hour'
              },
              position: 'bottom'
            }],
            yAxes: [
              {
                id: 'yAxis1',
                ticks: {
                  suggestedMin: 0,
                  suggestedMax: 360,
                  stepSize: 45 * 2,
                  callback: function (value, index, values) {
                    const compass = ['N', 'W', 'S', 'E', 'N']
                    return compass[index]
                  }
                }
              },
              {
                id: 'yAxis2',
                position: 'right',
                gridLines: {
                  drawOnChartArea: false // only want the grid lines for one axis to show up
                },
                ticks: {
                  suggestedMin: 0,
                  suggestedMax: 360,
                  stepSize: 45 * 2,
                  callback: function (value, index, values) {
                    return `${value}°`
                  }
                }
              }
            ]
          },
          tooltips: {
            callbacks: {
              label: function (tooltipItem, data) {
                const deg = tooltipItem.yLabel
                const degArray = []
                for (let index = 0.0; index <= 360.00; index += 11.25) {
                  degArray.push(index)
                }
                let fromDir = 'TODO'
                if (deg >= degArray[0] && deg < degArray[1]) {
                  fromDir = 'N'
                } else if (deg > degArray[1] && deg < degArray[3]) {
                  fromDir = 'NNE'
                } else if (deg > degArray[3] && deg < degArray[5]) {
                  fromDir = 'NE'
                } else if (deg > degArray[5] && deg < degArray[7]) {
                  fromDir = 'ENE'
                } else if (deg > degArray[7] && deg < degArray[9]) {
                  fromDir = 'E'
                } else if (deg > degArray[9] && deg < degArray[11]) {
                  fromDir = 'ESE'
                } else if (deg > degArray[11] && deg < degArray[13]) {
                  fromDir = 'SE'
                } else if (deg > degArray[13] && deg < degArray[15]) {
                  fromDir = 'SSE'
                } else if (deg > degArray[15] && deg < degArray[17]) {
                  fromDir = 'S'
                }
                return `${deg} deg (from ${fromDir})`
              }
            }
          }
        }
      })
    }
  },
  async mounted () {
    const res = await StationService.all()
    this.createChart('planet-chart', res.data[0])
    console.log(res.data)
  }
}
</script>

<style>
#app {
  background-color:aliceblue;
}
</style>
