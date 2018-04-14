<template>
  <div class="main">
    <el-alert v-if="show" title="请求服务器出错！" :description="errorMsg" type="error" show-icon style="margin-top:20px" :default-sort = "{prop: 'filmNum', order: 'descending'}" @sort-change="sortChange">
    </el-alert>

    <div class='myForm' style="margin-top:10px">
      <el-table :data="tableData" border height="580" style="width: 800px" size="medium">
        <el-table-column prop="directorName" label="导演名字" width="160">
        </el-table-column>
        <el-table-column prop="filmNum" label="作品部数" width="130" sortable>
        </el-table-column>
        <el-table-column prop="filmNames" label="作品" width="350">
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <el-button type="text" size="small">
              <a target="_blank" :href='"https://movie.douban.com/celebrity/" + scope.row.directorId'>导演信息</a>
            </el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">作品详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="margin-top:10px">
        <el-pagination samll="true" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="dataTotal">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick(row) {
      console.log(row)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.getInfo()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pageNum = val
      this.getInfo()
    },
    sortChange(column, prop, order) {
      console.log(column)
      console.log(prop)
      console.log(order)
    },
    getInfo() {
      var url = 'directors/information'
      this.$axios
        .get(url, {
          params: {
            pageSize: this.pageSize,
            pageNum: this.pageNum
          }
        })
        .then(res => {
          console.log(res.data)
          this.pageSize = res.data.pageSize,
          this.pageNum = res.data.pageNum,
          this.tableData = res.data.list,
          this.dataTotal = res.data.total
        })
        .catch(error => {
          console.log(error)
          this.errorMsg = error.data
          this.show = true
        })
    }
  },
  data() {
    return {
      currentPage: 1,
      dataTotal: 0,
      tableData: [],
      pageSizes: [10, 20, 100, 400],
      pageSize: 400,
      show: false,
      errorMsg: '',
      pageNum: 1
    }
  },
  created() {
    this.getInfo()
  }
}
</script>