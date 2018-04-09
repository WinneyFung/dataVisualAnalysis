<template>
  <div class="main">

    <el-alert v-if="show" title="请求服务器出错！" :description="errorMsg" type="error" show-icon style="margin-top:20px">
    </el-alert>

    <div style="margin-top: 10px">
      <el-radio-group v-model="radioChoice" size="small" @change="changeHandler">
        <el-radio-button label="条形图"></el-radio-button>
        <el-radio-button label="饼图"></el-radio-button>
        <el-radio-button label="折线图" disabled></el-radio-button>
        <el-radio-button label="漏斗图" disabled></el-radio-button>
      </el-radio-group>
    </div>
    <div>
    <div id="myChart" style="width: 600px;height:400px;margin-left:auto;display:inline-block;margin-top: 20px">

    </div>

    <div class="myComment" style="width: 250px;display:inline-block;float:right;margin-top:80px;margin-right:20px;">
      <p>
        分析可知，近几年，上映最多的电影类型是{{maxType}}，其次是{{mediumType}},第三位的是{{minType}}.这些电影类型之所以占比大，其必然离不开受众的关系。
      </p>
      <p>但是，这些电影类型的打出，受众是否能够真的接收并且买账呢？可以看看电影类型以及其获得的平均分关系。</p>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'genresOfSize',
  data() {
    return {
      show:false,
      genresAll: [],
      radioChoice: '',
      myTitle: '电影类型占比分析',
      xAxisData: [],
      seriesData: [],
      barYName: '电影部数',
      pieSeriesData: [],
      canDraw: false,
      maxType:"",
      mediumType:"",
      minType:"",
      errorMsg:""
    }
  },
  methods: {
    changeHandler(value) {
      console.log('change')
      console.log(value)
    },
    changeData(orgData) {
      var dataLen = orgData.length
      var filmType = new Array(dataLen)
      var filmCount = new Array(dataLen)
      var pieSeries = new Array(dataLen)
      if (dataLen >= 3) {
        this.maxType = orgData[0].genre
        this.mediumType = orgData[1].genre
        this.minType = orgData[2].genre

      }
      for (var i = 0; i < dataLen; i++) {
        var filmObj = new Object()
        filmObj.name = orgData[i].genre
        filmObj.value = orgData[i].genreNum
        filmType[i] = orgData[i].genre
        filmCount[i] = orgData[i].genreNum
        pieSeries[i] = filmObj
      }
      this.xAxisData = filmType
      this.seriesData = filmCount
      this.pieSeriesData = pieSeries
      this.radioChoice = '条形图'
      this.canDraw = true
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      console.log(myChart)
    },

    //画出电影类型的条形图
    drawBar() {
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      myChart.hideLoading();
      myChart.clear()
      // 显示标题，图例和空的坐标轴
      myChart.setOption({
        title: {
          text: this.myTitle
        },
        tooltip: {},
        toolbox: {
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        legend: {
          data: ['电影部数']
        },
        xAxis: {
          data: this.xAxisData
        },
        yAxis: {},
        series: [
          {
            name: '电影部数',
            type: 'bar',
            data: this.seriesData
          }
        ]
      })
    },

    // 画出电影类型的饼图
    drawPie() {
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      myChart.hideLoading();
      myChart.clear()
      // 显示标题，图例和空的坐标轴
      myChart.setOption({
        title: {
          text: this.myTitle,
          subtext: '',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        toolbox: {
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: this.xAxisData
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['60%', '50%'],
            data: this.pieSeriesData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    },

    //画出电影类型的漏斗图
    drawLouDou() {
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      myChart.hideLoading();
      myChart.clear()
      myChart.setOption({
        title: {
          text: this.myTitle,
          subtext: ''
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}'
        },
        toolbox: {
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        legend: {
          data: this.xAxisData
        },
        calculable: true,
        series: [
          {
            name: this.myTitle,
            type: 'funnel',
            left: '10%',
            top: 60,
            //x2: 80,
            bottom: 60,
            width: '80%',
            // height: {totalHeight} - y - y2,
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
              normal: {
                show: true,
                position: 'inside'
              },
              emphasis: {
                textStyle: {
                  fontSize: 20
                }
              }
            },
            labelLine: {
              normal: {
                length: 10,
                lineStyle: {
                  width: 1,
                  type: 'solid'
                }
              }
            },
            itemStyle: {
              normal: {
                borderColor: '#fff',
                borderWidth: 1
              }
            },
            data: this.pieSeriesData
          }
        ]
      })
    }
  },
  created() {
    var url = '/genres/all'
    this.$axios
      .get(url)
      .then(res => {
        console.log(res.data)
        this.changeData(res.data)
      })
      .catch(error => {
        console.log(error)
        this.errorMsg = error.data
        this.show = true
      })
  },
  updated() {
    if (this.radioChoice == '条形图') {  
      this.drawBar()
    } else if (this.radioChoice == '饼图') {
      this.drawPie()
    } else if (this.radioChoice == '漏斗图') {
      this.drawLouDou()
    }
  },
  mounted() {
    if (!this.canDraw) {
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      myChart.showLoading();
    } else if (this.canDraw) {
      this.drawBar()
    }
  }
}
</script>

<style scoped>
.main {
  display: inline-block;
}
</style>


