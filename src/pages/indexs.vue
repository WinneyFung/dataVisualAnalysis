<template>
  <div class="left-index">
    <div class="select-button">
      <el-row class="el-row_class">
        <el-button  plain size="medium"  :autofocus="selectedWorld" v-on:click="selectedWorld = true">世界电影史</el-button>
        <el-button  plain size="medium"  :autofocus="!selectedWorld" v-on:click="selectedWorld = false">中国电影史</el-button>
      </el-row>
    </div>
    <el-tabs :tab-position="tabPosition" style="height: 200px;margin-top: 40px;" v-if="selectedWorld">
      <el-tab-pane label="用户管理">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
    <el-tabs :tab-position="tabPosition" style="height: 200px;margin-top: 40px;" v-if="!selectedWorld">
      <el-tab-pane label="中国电影起步">用户管理</el-tab-pane>
      <el-tab-pane label="中国近代电影">配置管理</el-tab-pane>
      <el-tab-pane label="中国高分电影">角色管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'indexs',
  data() {
    return {
      tabPosition: 'left',
      selectedWorld:true
    }
  },
  methods:{
    changeHistory:function() {
        
    }
  },
  computed:{
  
  }
}
</script>

<style>
.left-index {
  margin-left: 130px;
  margin-top: 40px;
}
.el-row_class {
  margin-left: 50px;
  margin-top: 20px;
}
</style>


