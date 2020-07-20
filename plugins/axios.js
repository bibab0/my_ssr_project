import qs from 'qs'
import { Message } from 'element-ui'
export default ({ store, $axios, $cookies, redirect }) => {
  $axios.onRequest((config) => {
    // 头部带上验证信息
    config.headers['X-Token'] = $cookies.get('token') || ''
    config.headers['X-Device-Id'] = $cookies.get('clientId') || ''
    config.headers['X-Uid'] = $cookies.get('userId') || ''
    config.timeout = 30000
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
      errorHandle(response.data.result, response.data.msg)
      return Promise.reject(response)
    }
    return response
  })

  const errorHandle = (status, msg) => {
  // 状态码判断
    // redirect('/400')
    switch (status) {
      case 401:// 401: 权限不足
        messageTip(msg)
        break
      case 403:// 403 token过期  清除token并跳转登录页
        messageTip(msg)
        //   store.commit('SET_USERTOKEN', '')
        //   store.commit('SET_USERINFO', {})
        break
      case 404:// 404请求不存在
        messageTip(msg)
        break
      default:
        messageTip(msg || '服务器出错了')
    }
  }
}

const messageTip = (msg) => {
  Message({
    message: msg,
    type: 'error'
  })
}
