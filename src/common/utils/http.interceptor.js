import $config from 'config/config.js'
import { getCurrentPageUrlWithArgs } from 'eagle-ui/libs/function/common-methods'
// 这里的vm，就是我们在vue文件里面的this，所以我们能在这里获取vuex的变量，比如存放在里面的token
// 同时，我们也可以在此使用getApp().globalData，如果你把token放在getApp().globalData的话，也是可以使用的
const install = (Vue, vm) => {
  // console.log($config.service)
  Vue.prototype.$u.http.setConfig({
    baseUrl: $config.service.replace('/api', ''),
    originalData: true
  })
  // 请求拦截，配置Token等参数
  Vue.prototype.$u.http.interceptor.request = config => {

    // if (config.isJson) {
    config.data = JSON.stringify(config.data)
    config.header['Content-Type'] = 'application/json'
    // } else {
    //   config.url = config.url + Vue.prototype.$u.queryParams(config.data, true, 'comma')
    //   config.data = null
    //   config.header['Content-Type'] = 'application/x-www-form-urlencoded'
    // }
    // console.log(config.data)
    return config
  }
  // 响应拦截，判断状态码是否通过
  Vue.prototype.$u.http.interceptor.response = res => {
    if (res.statusCode === 200) {
      return res.data
    } else if (res.statusCode === 401) {
      // 权限不足
      // console.log(401)
      // Vue.prototype.$u.vuex('vuex_islogin', false)
      // if (getCurrentPageUrlWithArgs().url !== 'pages/login/login') {
      //   Vue.prototype.$u.vuex('vuex_return_url', `/${getCurrentPageUrlWithArgs().urlWithArgs}`)
      // }
      // uni.reLaunch({
      //   url: '/pages/login/login'
      // })
    } else return false
  }
}

export default {
  install
}
