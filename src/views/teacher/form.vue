<template>
  <!--

    页面组件的根节点必须是 template
    template中有且只有一个子节点，当前页面的子节点用div表示
    页面中的其他内容必须写在div节点中
 -->
  <div class="app-container">
    <!-- 查询表单 -->
    <el-form label-width="80px">

      <el-form-item label="讲师名">
        <el-input v-model="teacher.name"/>
      </el-form-item>

      <el-form-item label="入驻时间">
        <el-date-picker v-model="teacher.joinDate" value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" :min="0"/>
      </el-form-item>

      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
            -->
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>

      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro"/>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career" :rows="10" type="textarea"/>
      </el-form-item>
      <!-- 讲师头像：TODO -->

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate()">保存</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>

import teacherApi from '@/api/teacher'

// 页面的脚本写在script标签中，以模块的形式导出
export default {

  data() {
    return {
      teacher: {
        sort: 0,
        level: 1
      },
      saveBtnDisabled: false // 防止表单重复提交
    }
  },

  // 生命周期方法
  created() {
    if (this.$route.params.id) {
      // 回显数据
      this.fetchDataById(this.$route.params.id)
    }
  },

  methods: {

    // 回显数据
    fetchDataById(id) {
      teacherApi.getById(id).then(response => {
        this.teacher = response.data.item
      })
    },

    saveOrUpdate() {
      this.saveBtnDisabled = true

      if (this.teacher.id) {
        this.updateData()
      } else {
        this.saveData()
      }
    },

    // 新增讲师
    saveData() {
      teacherApi.save(this.teacher).then(response => {
        this.$message.success(response.message)
        this.$router.push({ path: '/teacher/list' })
      })
    },

    // 更新讲师
    updateData() {
      teacherApi.updateById(this.teacher).then(response => {
        this.$message.success(response.message)
        this.$router.push({ path: '/teacher/list' })
      })
    }
  }

}
</script>
