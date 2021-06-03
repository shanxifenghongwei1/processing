import $jsonurl from 'config/api-url.js'

export default function goodsService(http) {
  return {
    // 商品搜索
    search(params) {
      return http.post($jsonurl.goods.search, params)
    },
    leftlist(params) {
      return http.post($jsonurl.goods.leftlist, params)
    },
    
    productsall(params) {
      return http.post($jsonurl.goods.productsall, params)
    },
    
    
    sales(params) {
      return http.post($jsonurl.goods.sales, params)
    },

    
    pricesort(params) {
      return http.post($jsonurl.goods.pricesort, params)
    },

    
    goodsdetails(params) {
      return http.post($jsonurl.goods.goodsdetails, params)
    },

    
    specs(params) {
      return http.post($jsonurl.goods.specs, params)
    },


    pushsku(params) {
      return http.post($jsonurl.goods.pushsku, params)
    },
    

    ordermoney(params) {
      return http.post($jsonurl.goods.ordermoney, params)
    },

    
    goodscommit(params) {
      return http.post($jsonurl.goods.goodscommit, params)
    },

    
    allcommit(params) {
      return http.post($jsonurl.goods.allcommit, params)
    },

    
    pjlist(params) {
      return http.post($jsonurl.goods.pjlist, params)
    },

    
    baforepay(params) {
      return http.post($jsonurl.goods.baforepay, params)
    },

    olduserdingqi(params) {
      return http.post($jsonurl.goods.olduserdingqi, params)
    },
    

    meiqituiping(params) {
      return http.post($jsonurl.goods.meiqituiping, params)
    },
    
    meiqitui(params) {
      return http.post($jsonurl.goods.meiqitui, params)
    },
    
    meiqishanchutuipin(params) {
      return http.post($jsonurl.goods.meiqishanchutuipin, params)
    },
    

  }
}
