import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'https://kyjvuedemo.dahe.cn' : 'https://kyjvuedemo.dahe.cn',
  timeout: 1000 * 10,
  transformRequest: [function (data) {
    if (data) {
      for (const i in data) {
        if (data[i] === '' || data[i] === null || data[i] === undefined) {
          delete data[i]
        }
      }
      // 把data转换成formdata
      return qs.stringify(data)
    }
  }]
})
// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
    // const token = store.state.UserToken
    // token && (config.headers.Authorization = token)
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  })

// 添加响应拦截器
instance.interceptors.response.use((response) => {
  // 对响应数据做点什么
  if (response.data.result !== 200) {
    messageTip(response.data.msg)
    return Promise.reject(response)
  } else {
    return response
  }
}, (error) => {
  // 对响应错误做点什么
  errorHandle(error.response.status, error.response.data.msg)
  return Promise.reject(error)
})
const errorHandle = (status, msg) => {
  // 状态码判断
  switch (status) {
    // 401: 权限不足
    case 401:
      messageTip(msg)
      break
      // 403 token过期  清除token并跳转登录页
    case 403:
      messageTip(msg)
      //   store.commit('SET_USERTOKEN', '')
      //   store.commit('SET_USERINFO', {})
      toLogin()
      break
      // 404请求不存在
    case 404:
      messageTip(msg)
      break
    default:
      messageTip('服务器出错了')
  }
}
// 跳转登录页  携带当前页面路由，以便在登录页面完成登录后返回当前页面
const toLogin = () => {
//   router.replace({
//     path: '/login',
//     query: {
//       redirect: router.currentRoute.fullPath
//     }
//   })
}
const messageTip = (msg) => {
  Message({
    message: msg,
    type: 'error'
  })
}
Vue.prototype.$req = instance
