function initLineChart(nameArr, valueArr) {
  // var getname = ['机构认证', '个人认证', '其他']
  // var getvalue = [280, 125, 118]
  var getname = nameArr
  var getvalue = valueArr
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
      top: 10,
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
      data: ['5日', '6日', '7日', '8日', '9日', '10日', '11日', '12日']
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
      data: [
        2136, 3693, 2962, 3810, 3519, 3484, 3915, 3823, 3455, 4310, 4019, 3433, 3544, 3885, 4208, 3372,
        3484, 3915, 3748, 3675, 4009, 4433, 3544, 3285, 4208, 3372, 3484, 3915, 3823, 4265, 4298
      ]
    }]
  }
  return option
}
export default {
  initLineChart
}
