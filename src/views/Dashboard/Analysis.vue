<template>
  <div>
    Analysis
    <charts style="height: 400px;" :option="chartOption"></charts>
  </div>
</template>

<script>
import Charts from '../../components/Chart'
import request from '../../utils/request'

export default {
  components: {
    Charts
  },
  data () {
    return {
      chartOption: {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }
    }
  },
  mounted () {
    this.getChartData()
    this.interval = setInterval(() => {
      this.getChartData()
    }, 30 * 60 * 1000)
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  methods: {
    getChartData () {
      request({
        url: '/api/dashboard/chart',
        method: 'get',
        params: { id: 123 }
      })
        .then(response => {
          this.chartOption = {
            title: {
              text: 'ECharts 入门示例'
            },
            tooltip: {},
            xAxis: {
              data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [
              {
                name: '销量',
                type: 'bar',
                data: response.data
              }
            ]
          }
        })
    }
  }
}
</script>

<style>
</style>
