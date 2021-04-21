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
