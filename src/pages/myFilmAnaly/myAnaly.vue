<template>
  <div class="index-wrap">
    <div class="index-left">
      <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" style="width:200px;" @select="handleSelect">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>电影类型分析</span>
          </template>
          <el-menu-item-group>
            <template slot="title">类型直观分析</template>
            <el-menu-item index="1-1">电影类型比例</el-menu-item>
            <el-menu-item index="1-2">电影类型与其评分关系</el-menu-item>
            <el-menu-item index="1-3">与高评分电影联系</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">类型与导演关联分析</template>
            <el-menu-item index="1-4">综合分析</el-menu-item>
            <el-menu-item index="1-5">近年作品较多的导演分析</el-menu-item>
          </el-menu-item-group>
         
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-menu"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-menu"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </div>

    <div class="index-right">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'indexFilmInfo',
  data() {
    return {}
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
      if (key ==='1-1') {
          this.$router.push('/myAnaly/genresOfSize')
      } else if (key ==='1-2') {
          this.$router.push('/myAnaly/FilmGenresAvg')
      }

    }
  }
}
</script>

<style>
.index-wrap {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
.index-left {
  float: left;
  width: 300px;
  text-align: left;
}
.index-right {
  float: left;
  width: 900px;
}
</style>


