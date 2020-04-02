<template>
  <div id="app">
    <canvas id="planet-chart"></canvas>
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
            yAxes: [{
              ticks: {
                suggestedMin: 0,
                suggestedMax: 360,
                stepSize: 45 * 2,
                callback: function (value, index, values) {
                  const compass = ['N', 'W', 'S', 'E', 'N']
                  return compass[index]
                }
              }
            }]
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
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
