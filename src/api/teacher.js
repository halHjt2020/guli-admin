import request from '@/utils/request'

export default{

  list() {
    return request({
      url: '/admin/edu/teacher/list',
      method: 'get'
    })
  },

  pageList(page, limit, searchObj) {
    return request({
      url: `/admin/edu/teacher/list/${page}/${limit}`,
      method: 'get',
      params: searchObj // 使用url查询字符串传参
    })
  },

  removeById(id) {
    return request({
      url: `/admin/edu/teacher/remove/${id}`,
      method: 'delete'
    })
  },

  save(teacher) {
    return request({
      url: '/admin/edu/teacher/save',
      method: 'post',
      data: teacher // 在请求体中用json字符串的形式传参
    })
  },

  updateById(teacher) {
    return request({
      url: '/admin/edu/teacher/update',
      method: 'put',
      data: teacher // 在请求体中用json字符串传参
    })
  },

  getById(id) {
    return request({
      url: `/admin/edu/teacher/get/${id}`,
      method: 'get'
    })
  }
}
