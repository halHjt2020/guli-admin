<template>
  <!--

    页面组件的根节点必须是 template
    template中有且只有一个子节点，当前页面的子节点用div表示
    页面中的其他内容必须写在div节点中
 -->
  <div class="app-container">
    讲师表单

    保存按钮
  </div>
</template>

<script>

import teacherApi from '@/api/teacher'

// 页面的脚本写在script标签中，以模块的形式导出
export default {

  data() {
    return {
      teacher: {}
    }
  },

  created() {

  },

  methods: {
    saveOrUpdate() {
      if (this.teacher.id) {
        this.updateData()
      } else {
        this.saveData()
      }
    },

    saveData() {},

    updateData() {
      teacherApi.updateById(this.teacher)
    }
  }

}
</script>
