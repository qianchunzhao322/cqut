<template>
  <div class="container">
    <EmptyCom v-if="showEmpty" />
    <div v-if="!showEmpty" id="map_pie" class="content" />
  </div>
</template>

<script>
import * as echarts from 'echarts'
import lineChart from '@/components/dataAnalysis/lineChart/lineChart'
import EmptyCom from '@/components/EmptyCom/index'
import { pieMap } from '@/api/index'
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
    this.getPieData1()
    // this.initUnitPieChart()
    window.addEventListener('resize', this.resizeCharts)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeCharts)
  },
  methods: {
    getPieData1() {
      this.chart = echarts.init(document.getElementById('map_pie'))
      this.chart.setOption(lineChart.initLineChart(['name'], ['value']))
    },
    getPieData() {
      pieMap().then((res) => {
        const tempName = []
        const tempValue = []
        if (res.data.length === 0) {
          this.showEmpty = true
          return
        }
        res.data.forEach(item => {
          tempName.push(item.companyType || '')
          tempValue.push(item.count)
          // if (item.companyType) {
          //   tempName.push(item.companyType || '')
          //   tempValue.push(item.count)
          // } else {
          //   return
          // }
        })
        this.initUnitPieChart(tempName, tempValue)
      })
    },
    resizeCharts() {
      this.chart.resize()
    },
    initUnitPieChart(name, value) {
      this.chart = echarts.init(document.getElementById('map_pie'))
      this.chart.setOption(pieChart.initPieChart(name, value))
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
