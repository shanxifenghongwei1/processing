import $jsonurl from 'config/api-url.js'

export default function informationService(http) {
  return {
    // 资讯详情
    detail(params) {
      return http.get($jsonurl.information.detail, params)
    }
  }
}
