import $jsonurl from 'config/api-url.js'

export default function newsService(http) {
  return {
    // 资讯列表
    // list(params) {
    //   return http.get($jsonurl.news.list, params)
    // },
        list(params) { //通知公告
          return http.post($jsonurl.news.list, params)
        },
    // 公告列表
    notice(params) {
      return http.post($jsonurl.news.notice, params)
    },
    nearby(params) {
      return http.post($jsonurl.news.nearby, params)
    },
    
    banner(params) {
      return http.post($jsonurl.news.banner, params)
    },
    
    business(params) {
      return http.post($jsonurl.news.business, params)
    },
    
    pipeline(params) {
      return http.post($jsonurl.news.pipeline, params)
    },
    
    shopdetail(params) {
      return http.post($jsonurl.news.shopdetail, params)
    },

    goodsall(params) {
      return http.post($jsonurl.news.goodsall, params)
    },

    
    shopcomment(params) {
      return http.post($jsonurl.news.shopcomment, params)
    },

    shopallComment(params) {
      return http.post($jsonurl.news.shopallComment, params)
    },

    userrepair(params) {
      return http.post($jsonurl.news.userrepair, params)
    },

    shopcoupon(params) {
      return http.post($jsonurl.news.shopcoupon, params)
    },

    
    getcoupon(params) {
      return http.post($jsonurl.news.getcoupon, params)
    },

    
    pjshopdetial(params) {
      return http.post($jsonurl.news.pjshopdetial, params)
    },


    pjhotgoods(params) {
      return http.post($jsonurl.news.pjhotgoods, params)
    },

    pjgoodsall(params) {
      return http.post($jsonurl.news.pjgoodsall, params)
    },


    pgpay(params) {
      return http.post($jsonurl.news.pgpay, params)
    },
    

    qishoulogin(params) {
      return http.post($jsonurl.news.qishoulogin, params)
    },

    qishouenter(params) {
      return http.post($jsonurl.news.qishouenter, params)
    },
    
    qishoureceiving(params) {
      return http.post($jsonurl.news.qishoureceiving, params)
    },
    
    
    qishoudorder(params) {
      return http.post($jsonurl.news.qishoudorder, params)
    },


    qishoudetial(params) {
      return http.post($jsonurl.news.qishoudetial, params)
    },
    
    

    qishoumyorder(params) {
      return http.post($jsonurl.news.qishoumyorder, params)
    },

    
    shanghuruzhusongqi(params) {
      return http.post($jsonurl.news.shanghuruzhusongqi, params)
    },

    qishoujiedan(params) {
      return http.post($jsonurl.news.qishoujiedan, params)
    },

    qishouzhuangtai(params) {
      return http.post($jsonurl.news.qishouzhuangtai, params)
    },
    
    qishouticheng(params) {
      return http.post($jsonurl.news.qishouticheng, params)
    },
    
    
    // 资讯详情
    detail(type, id) {
      if (type === 'news') {
        return http.get($jsonurl.news.newsdetail.format(id))
      } else {
        return http.get($jsonurl.news.noticedetail.format(id))
      }
    }
  }
}
