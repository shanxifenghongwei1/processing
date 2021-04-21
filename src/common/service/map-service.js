import $jsonurl from 'config/api-url.js'

export default function mapService(http) {
  return {
    // 楼层列表
    list(params) {
      return http.get($jsonurl.map.list, params)
    },
    // 楼层详情
    detail(id, params) {
      return http.get($jsonurl.map.detail.format(id), params)
    },
    // 线路列表
    route(params) {
      return http.get($jsonurl.map.route, params)
    },
    // 线路详情
    routeDetail(params) {
      return http.get($jsonurl.map.routeDetail, params)
    },
    // 展区关联数据
    exhibitionArea(params) {
      return http.post($jsonurl.map.exhibitionArea, params, true)
    },
    // 展品关联数据
    relics(params) {
      return http.post($jsonurl.map.relics, params, true)
    }
  }
}
