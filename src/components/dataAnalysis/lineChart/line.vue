<template>
  <div class="container">
    <EmptyCom v-if="showEmpty" />
    <div v-if="!showEmpty" id="map_line" class="content" />
  </div>
</template>

<script>
import * as echarts from 'echarts'
import lineChart from '@/components/dataAnalysis/lineChart/lineChart'
import EmptyCom from '@/components/EmptyCom/index'
import { getSysService } from '@/api/systemSettings/sysOpt'
export default {
  name: 'Line',
  components: {
    EmptyCom
  },
  data() {
    return {
      chart: null,
      showEmpty: false
    }
  },
  mounted() {
    this.getLineData()
    // this.getLine()
    // this.initUnitPieChart()
    window.addEventListener('resize', this.resizeCharts)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeCharts)
  },
  methods: {
    getLineData() {
      getSysService().then((res) => {
        if (res.code === 200) {
          // this.lineData = res.data.data
          this.getLine(res.data.data.dayArr, res.data.data.numArr)
        }
      })
    },
    getLine(day, num) {
      this.chart = echarts.init(document.getElementById('map_line'))
      this.chart.setOption(lineChart.initLineChart(day, num))
    },
    resizeCharts() {
      this.chart.resize()
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  height: 100%;
  width: 100%;
  position: relative;
  .content{
    height: 100%;
    width: 100%;
  }
}
</style>
