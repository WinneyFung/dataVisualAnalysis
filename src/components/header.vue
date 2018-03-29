<template>
    <div>
        <div class="line">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#e3e4e8">
                <el-submenu index="1" style="margin-left:180px">
                    <template slot="title">首页</template>
                    <el-menu-item index="1-1" @select="handleSelect">世界电影史</el-menu-item>
                    <el-menu-item index="1-2" @select="handleSelect">中国电影史</el-menu-item>
                </el-submenu>
                <el-menu-item index="2" style="margin-left:80px">电影数据分析</el-menu-item>
                <el-menu-item index="3" style="margin-left:80px">自定义分析</el-menu-item>
            </el-menu>
        </div>

        <div class="main">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
      if (key === '1') {
        this.$router.push('/index')
      } else if (key === '2') {
        this.$router.push('/myAnaly')
      } else if (key === '3') {

      } else if (key === '1-1') {
        this.$router.push('/index')
      } else if (key === '1-2') {
           this.$router.push('/index/cn')
      }
    }
  }
}
</script>

<style>

</style>