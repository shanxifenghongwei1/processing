import Vue from 'vue'
import App from './App'
import EagleUI from 'eagle-ui'

Vue.config.productionTip = false

App.mpType = 'app'

// http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
import httpInterceptor from 'utils/http.interceptor.js'
// http接口API抽离，免于写url或者一些固定的参数
import httpApi from 'utils/http.api.js'
import 'src/common/utils/extends'
// 枚举
import $jsonBasic from 'utils/basic'
import 'src/eagle-ui/libs/function/filters.js'

Vue.config.productionTip = false

Vue.prototype.$jsonBasic = $jsonBasic


// tabbar
Vue.prototype.$tabbar = ['pages/tab-bar/index', 'pages/tab-bar/shop', 'pages/tab-bar/message','pages/tab-bar/my']

// 引入全局uView
Vue.use(EagleUI)


// 此处为演示vuex使用，非EagleUI的功能部分
import store from '@/store'
// 引入EagleUI提供的对vuex的简写法文件
let vuexStore = require('@/store/$u.mixin.js')
Vue.mixin(vuexStore)
// 引入EagleUI对小程序分享的mixin封装
let mpShare = require('eagle-ui/libs/mixin/mpShare.js')
Vue.mixin(mpShare)




const app = new Vue({
  store,
  ...App
})

// 这里需要写在最后，是为了等Vue创建对象完成，引入"app"对象(也即页面的"this"实例)
Vue.use(httpInterceptor, app)
Vue.use(httpApi, app)
app.$mount()
