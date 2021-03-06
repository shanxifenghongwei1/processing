import userService from 'service/user-service'
import exhibitionService from 'service/exhibition-service'
import newsService from 'service/news-service'
import goodsService from 'service/goods-service'
import mapService from 'service/map-service'
import appointmentService from 'service/appointment-service'
import informationService from 'service/information-service'
import commonService from 'service/common-service'

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见EagleUI对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
  // 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
  vm.$u.api = {
    userService: userService(vm.$u),
    exhibitionService: exhibitionService(vm.$u),
    newsService: newsService(vm.$u),
    appointmentService: appointmentService(vm.$u),
    goodsService: goodsService(vm.$u),
    mapService: mapService(vm.$u),
    informationService: informationService(vm.$u),
    commonService: commonService(vm.$u)
  }
}

export default {
  install
}
