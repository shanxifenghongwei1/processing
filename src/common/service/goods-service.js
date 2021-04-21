import $jsonurl from 'config/api-url.js'

export default function goodsService(http) {
  return {
    // 商品搜索
    search(params) {
      return http.post($jsonurl.goods.search, params)
    }
  }
}
