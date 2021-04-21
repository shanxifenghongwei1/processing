import $jsonurl from 'config/api-url.js'
export default function appointmentService(http) {
  return {
    // 预约价格
    datelist(params) {
      return http.get($jsonurl.appointment.datelist, params)
    },
    // 根据日期获取时间段内票数信息
    timelist(params) {
      return http.get($jsonurl.appointment.timelist, params)
    },
    submit(params) {
      return http.post($jsonurl.appointment.submit, params, true)
    },
    addperson(params) {
      return http.post($jsonurl.appointment.persondata, params, true)
    },
    delperson(params) {
      return http.delete($jsonurl.appointment.persondata, params)
    },
    editperson(params) {
      return http.put($jsonurl.appointment.persondata, params, true)
    },
    personlist(params) {
      return http.get($jsonurl.appointment.personlist, params)
    },
    // 预约列表
    list(params) {
      return http.get($jsonurl.appointment.list, params)
    },
    // 预约详情
    detail(id) {
      return http.get($jsonurl.appointment.detail.format(id))
    },
    // 联系人详情
    persondetail(id) {
      return http.get($jsonurl.appointment.persondetail.format(id))
    },
    //取消预约
    cancel(params) {
      return http.post($jsonurl.appointment.cancel, params)
    },
    //购票提醒 文字
    ticket(params) {
      return http.get($jsonurl.appointment.ticket, params)
    }
  }
}
