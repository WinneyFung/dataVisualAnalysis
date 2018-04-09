<template>
  <div class="main">

    <el-alert v-if="show" title="请求服务器出错！" :description="errorMsg" type="error" show-icon style="margin-top:20px">
    </el-alert>
    <div style="width:900px">
      <div id="myChart" style="width: 700px;height:700px;margin-left:auto;display:inline-block;margin-top: 20px;float:left;">

      </div>

      <div class="myComment" style="width:700px;display:inline-block;margin-right:10px">
        <p>从图表数据中，我们可以清楚的看出，只有歌舞类型和纪录片类型的平均评分是在豆瓣和微博平台上的评分都达到8.0以上。</p>
        <p>可以得出的结论就是，近两年拍得最多的电影类型，观众其实并不是特别买账，但是为什么纪录片和歌舞类型的片占比不高呢？以上问题答案，我们可以从下面这个问题思考：</p>
        <P>
          <a target="_blank" href="https://www.zhihu.com/question/28923406/answer/43330968">知乎上有一个问题就提及:</a>印象中纪录片更容易获得高评分。是这样吗，为什么？</P>
        <p>其中有一个答主到：我觉得最主要的原因有两个方面：1、相对电影而言，纪录片理性大于感性，也就是说它更能引起人的反思，这会使得纪录片在人心里呈现出的价值分量重一点；2、纪录片拍摄难度太大了。这种难度不是投资、场景、规模、复杂度这些技术层面，而是精神难度：（1）首先，很多纪录片结果无法预知，这就意味着，你拍着拍着很可能就黄了，这是风险；（2）其次，制作纪录片的人得依靠事实，不能随着自己的想法编，也就是说，无法天马行空，故事情节、场景、道具、表达......从总体上而言，发挥的空间不大。很多纪录片导演到最后都改行拍电影，其原因之一就是觉得纪录片已经无法充分表达自己的思想了。（3）第三，这活真不赚钱。能坚持做纪录片的，多多少少都有些理想主义和关心天下苍生的毛病。用我们自己行内的话，做纪录片没钱赚，谈谈理想总可以吧。一无权，二无钱，三无地位，都活成这样了，还心系天下，能不给点高分么？
        </p>
        <p>而歌舞片，我国歌舞片并不多，<a target="v_blank" href="https://www.zhihu.com/question/266624998">网上</a>有人指出,我国的传统歌舞风格含蓄委婉，节奏较多舒缓如涓涓细流，追求的是一种优雅婉转、娓娓道来的感觉，如果放在荧屏上，面对背景不同的观众，无论在情绪还是在感性理解上，能产生的共鸣太少，因此无法融入市场。</p>
        <p>而在搜狐网,曾经发布这篇文章：<a target="v_blank" href="http://www.sohu.com/a/225489719_351788">面对观众的代际转换，电影产业如何抓住90后、00后消费群体？</a>其实看完整篇文章，最大的思考就是，一部电影作品的诞生，往往不仅在于其拍摄难度，其资本，往往离不开市场，而市场的把握，往往是最难的。</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'filmGenresAvg',
  data() {
    return {
      douBanData: [],
      weiboData: [],
      genreData: [],
      avg: [],
      show: false,
      errorMsg: ''
    }
  },
  methods: {
    changeData(res) {
      var doubanLen = res.doubanAvg.length
      var douBanArr = new Array(doubanLen)
      var weiboArr = new Array(doubanLen)
      var genresArr = new Array(doubanLen)
      var avgArr = new Array(doubanLen)

      for (var i = 0; i < doubanLen; i++) {
        douBanArr[i] = (res.doubanAvg[i].doubanAvg / 10).toFixed(1)
        genresArr[i] = res.doubanAvg[i].genre
      }

      for (var i = 0; i < doubanLen; i++) {
        weiboArr[i] = (res.weiboAvg[i].weiboAvg / 10).toFixed(1)
        avgArr[i] = (douBanArr[i] - weiboArr[i]).toFixed(1)
      }
      this.douBanData = douBanArr
      this.weiboData = weiboArr
      this.genreData = genresArr
      this.avg = avgArr
      console.log(this.douBanData)
      console.log(this.weiboData)
      console.log(this.genreData)
    },
    drawBar() {
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 显示标题，图例和空的坐标轴
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        toolbox: {
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        legend: {
          data: ['平台分差', '微博平均评分', '豆瓣平均评分']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'value'
          }
        ],
        yAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            data: this.genreData
          }
        ],
        series: [
          {
            name: '豆瓣平均评分',
            type: 'bar',
            label: {
              normal: {
                show: true,
                position: 'inside'
              }
            },
            data: this.douBanData
          },
          {
            name: '微博平均评分',
            type: 'bar',
            stack: '总分',
            label: {
              normal: {
                show: true
              }
            },
            data: this.weiboData
          },
          {
            name: '平台分差',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'left'
              }
            },
            data: this.avg
          }
        ]
      })
    }
  },
  created() {
    var url = '/genres/all/avgs'
    this.$axios
      .get(url)
      .then(res => {
        console.log(res.data)
        this.changeData(res.data)
        this.drawBar()
      })
      .catch(error => {
        console.log(error)
        this.errorMsg = error.data
        this.show = true
      })
  }
}
</script>

<style>

</style>


