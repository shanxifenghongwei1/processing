import $jsonurl from 'config/api-url.js'

export default function commonService(http) {
  return {
    thumbstatus(params) {
      return http.get($jsonurl.common.thumbstatus, params)
    },
    thumb(params) {
      return http.post($jsonurl.common.thumb, params)
    },
    slide(params) {
      return http.get($jsonurl.common.slide, params)
    },
    update(params) {
      return http.put($jsonurl.common.update, params, true)
    }
  }
}
