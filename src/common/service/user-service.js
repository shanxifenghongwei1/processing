import $jsonurl from 'config/api-url.js'

export default function userService(http) {
  return {
    login(params) {
      return http.post($jsonurl.user.login, params)
    },
    
    newaddress(params) {
      return http.post($jsonurl.user.newaddress, params)
    },
    
    address(params) {
      return http.post($jsonurl.user.address, params)
    },
    
    deleaddress(params) {
      return http.post($jsonurl.user.deleaddress, params)
    },
    
    updateaddress(params) {
      return http.post($jsonurl.user.updateaddress, params)
    },

    
    deteaddress(params) {
      return http.post($jsonurl.user.deteaddress, params)
    },

    
    defaults(params) {
      return http.post($jsonurl.user.defaults, params)
    },

    
    morenaddress(params) {
      return http.post($jsonurl.user.morenaddress, params)
    },

    userhave(params) {
      return http.post($jsonurl.user.userhave, params)
    },

    meiqiorderlist(params) {
      return http.post($jsonurl.user.meiqiorderlist, params)
    },
    
    meiqiorderdetial(params) {
      return http.post($jsonurl.user.meiqiorderdetial, params)
    },
    
    meiqiquxiaodingdan(params) {
      return http.post($jsonurl.user.meiqiquxiaodingdan, params)
    },

    meiqidingdanpingjia(params) {
      return http.post($jsonurl.user.meiqidingdanpingjia, params)
    },

    myconponlist(params) {
      return http.post($jsonurl.user.myconponlist, params)
    },
    
    pjorderlist(params) {
      return http.post($jsonurl.user.pjorderlist, params)
    },
    
    pjorderdetial(params) {
      return http.post($jsonurl.user.pjorderdetial, params)
    },
    
    pjquerenshouhuo(params) {
      return http.post($jsonurl.user.pjquerenshouhuo, params)
    },
    
    pjpingjia(params) {
      return http.post($jsonurl.user.pjpingjia, params)
    },
    
    
  }
}
