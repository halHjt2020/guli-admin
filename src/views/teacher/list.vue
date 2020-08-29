<template>
  <div class="app-container">

    <!-- 查询表单 -->
    <el-form :inline="true">

      <el-form-item>
        <el-input v-model="searchObj.name" placeholder="讲师名"/>
      </el-form-item>

      <el-form-item>
        <!-- el-select: 下拉菜单 -->
        <el-select v-model="searchObj.level" clearable placeholder="讲师头衔">
          <el-option value="1" label="高级讲师"/>
          <el-option value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>

      <el-form-item label="入驻时间">
        <el-date-picker
          v-model="searchObj.joinDateBegin"
          type="date"
          placeholder="开始时间"
          value-format="yyyy-MM-dd"/>
      </el-form-item>

      <el-form-item label="-">
        <el-date-picker
          v-model="searchObj.joinDateEnd"
          type="date"
          placeholder="结束时间"
          value-format="yyyy-MM-dd"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
        <el-button type="default" @click="resetData()">清空</el-button>
      </el-form-item>

    </el-form>

    <!-- 表格 -->
    <el-table :data="list" border stripe>

      <el-table-column type="index" width="50">
        <!-- scope: 获取当前行的所有的数据 -->
        <!-- $index 访问当前行的索引 -->
        <template slot-scope="scope">
          {{ ( page - 1 ) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" width="80" />
      <el-table-column label="头衔" width="90">
        <!-- 自定义列的内容 -->
        <!-- el-tag 标签组件 -->
        <template slot-scope="scope">
          <el-tag v-if="scope.row.level === 1" type="success" size="mini">高级讲师</el-tag>
          <el-tag v-if="scope.row.level === 2" size="mini">首席讲师</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="intro" label="简介" />
      <el-table-column prop="sort" label="排序" width="60" />
      <el-table-column prop="joinDate" label="入驻时间" width="160" />

      <el-table-column prop="" label="操作" width="200" align="center">
        <!-- 自定义列的内容 -->
        <template slot-scope="scope">
          <router-link :to="'/teacher/edit/' + scope.row.id">
            <el-button
              size="mini">编辑</el-button>
          </router-link>

          <el-button
            size="mini"
            type="danger"
            @click="removeById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>

    <!-- 分页组件 -->
    <!-- total：总记录数  layout：布局 -->
    <!-- "prev, pager, next, sizes, jumper, ->, total" 是字符串 -->
    <!-- @size-change 为组件注册事件，注意使用函数的引用 -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[5, 10, 20]"
      layout="prev, pager, next, sizes, jumper, ->, total"
      @size-change = "changePageSize"
      @current-change = "changeCurrentPage"
    />

  </div>
</template>

<script>
import teacherApi from '@/api/teacher'

export default {
  // 数据绑定
  data() {
    return {
      list: [],
      total: 0,
      page: 1, // 页码
      limit: 10, // 每页记录数
      searchObj: {} // 查询条件
    }
  },

  // 生命周期函数
  created() {
    // 获取讲师列表
    this.fetchData()
  },

  methods: {

    // 清空查询表单
    resetData() {
      // 清空查询表单
      this.searchObj = {}
      // 重新查询
      this.fetchData()
    },

    // 根据id删除记录
    // removeById1(id) {
    //   this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(response => {
    //     teacherApi.removeById(id).then(response => {
    //       this.fetchData()
    //       this.$message.success(response.message)
    //     })
    //   }).catch(result => {
    //     this.$message.success('取消删除')
    //   })
    // },

    removeById(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(response => {
        return teacherApi.removeById(id)
      }).then(response => {
        this.fetchData()
        this.$message.success(response.message)
      }).catch(result => {
        if (result === 'cancel') {
          this.$message.success('取消删除')
        }
      })
    },

    // 改变当前页码
    changeCurrentPage(currentPage) {
      this.page = currentPage
      this.fetchData()
    },

    // 改变页码打下：定义回调参数
    changePageSize(size) {
      // console.log('size', size)
      this.limit = size
      this.fetchData()
    },

    // fetchDate() {
    //   teacherApi.list().then(response => {
    //     this.list = response.data.items
    //     // response是r对象
    //     console.log(this.list)
    //   })
    // }

    // fetchData()方法由生命周期函数调用
    fetchData() {
      teacherApi.pageList(this.page, this.limit, this.searchObj).then(response => {
        this.list = response.data.pageModel.records
        this.total = response.data.pageModel.total
      })
    }
  }

}
</script>
