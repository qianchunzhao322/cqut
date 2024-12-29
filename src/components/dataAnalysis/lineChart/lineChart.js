function initLineChart(nameArr, valueArr) {
  var option = option = {
    backgroundColor: 'rgb(252, 253, 254)',

    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        textStyle: {
          color: '#fff'
        }

      }
    },
    grid: {
      borderWidth: 0,
      top: 45,
      bottom: 25,
      textStyle: {
        color: '#fff'
      }
    },
    legend: {
      x: '46%',
      top: '11%',
      textStyle: {
        color: '#90979c'
      },
      data: ['访问量']
    },

    calculable: true,
    xAxis: [{
      type: 'category',
      axisLine: {
        lineStyle: {
          color: 'rgba(204,187,225,0.9)'
        }
      },
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      data: nameArr
    }],

    yAxis: [{
      type: 'value',
      splitLine: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(204,187,225,0.9)'
        }
      }

    }],
    series: [{
      name: '访问量',
      type: 'line',
      symbolSize: 10,
      symbol: 'circle',
      itemStyle: {
        color: '#c257F6'
      },
      markPoint: {
        label: {
          normal: {
            textStyle: {
              color: '#fff'
            }
          }
        },
        data: [{
          type: 'max',
          name: '最大值'

        }, {
          type: 'min',
          name: '最小值'
        }]
      },
      data: valueArr
    }]
  }
  return option
}
export default {
  initLineChart
}
