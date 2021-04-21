import $jsonurl from 'config/api-url.js'

export default function exhibitionService(http) {
  return {
    // 展览列表
    list(params) {
      return http.get($jsonurl.exhibition.list, params)
    },
    // 展览详情
    detail(id) {
      return http.get($jsonurl.exhibition.detail.format(id))
    },
    // 展览关联展品
    exhibits(params) {
      return http.get($jsonurl.exhibition.exhibits, params)
    }
  }
}
