import qs from 'qs'
import { Message } from 'element-ui'
// import store from '@/store/state'
export default function ({ $axios, redirect }) {
  $axios.onRequest((config) => {
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // const token = store.state.UserToken
    const token = 'ssss'
    token && (config.headers.Authorization = token)
    config.transformRequest = [function (data) { // 把data转换成formdata
      if (data) {
        for (const i in data) {
          if (data[i] === '' || data[i] === null || data[i] === undefined) { delete data[i] }
        }
        return qs.stringify(data)
      }
    }]
    return config
  })
  $axios.onResponse((response) => {
    if (response.data.result !== 200) {
    //   errorHandle(response.response.status, response.response.data.msg)
      errorHandle(401, '权限不足')
    }
    return response
  })
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
  $axios.onResponseError((error) => {
    //   errorHandle(error.response.status, error.response.data.msg)
    errorHandle(error, error)
  })
}

const errorHandle = (status, msg) => {
  // 状态码判断
  switch (status) {
    case 401:// 401: 权限不足
      messageTip(msg)
      break
    case 403:// 403 token过期  清除token并跳转登录页
      messageTip(msg)
      //   store.commit('SET_USERTOKEN', '')
      //   store.commit('SET_USERINFO', {})
      //   toLogin()
      break
    case 404:// 404请求不存在
      messageTip(msg)
      break
    default:
      messageTip('服务器出错了')
  }
}
// 跳转登录页  携带当前页面路由，以便在登录页面完成登录后返回当前页面
// const toLogin = () => {
//   router.replace({
//     path: '/login',
//     query: {
//       redirect: router.currentRoute.fullPath
//     }
//   })
// }
const messageTip = (msg) => {
  Message({
    message: msg,
    type: 'error'
  })
}
