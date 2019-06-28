<template>
  <div>
    Analysis
    <charts style="height: 400px;" :option="chartOption"></charts>
  </div>
</template>

<script>
import Charts from '../../components/Chart'
export default {
  components: {
    Charts
  },
  data() {
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
  mounted() {
    this.interval = setInterval(() => {
      // this.chartOption.series[0].data[0] = Math.floor(Math.random() * 100)
      this.chartOption.series[0].data = this.chartOption.series[0].data.map(
        () => Math.floor(Math.random() * 100)
      )
      console.log(1)
      console.log(this.chartOption.series[0].data)
    }, 1700)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  }
}
</script>

<style>
</style>
