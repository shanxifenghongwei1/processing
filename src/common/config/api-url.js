const $jsonurl = {
  bank: {
    list: '/open/sys/dict' // [GET] 银行卡列表
  },
  user: {
    login: '/weChat', // 登录
  },
  goods:{
    search: '/acc/search' // 商品搜索
  },
  map: {
    list: '/open/guideMap', // 地图列表
    detail: '/open/guideMap/%s', // 地图详情
    route: '/open/route', // 线路列表
    routeDetail: '/open/route/detail', // 线路详情
    exhibitionArea: '/open/exhibitionArea/list', // 展区关联数据
    relics: '/open/relics/list' // 展品关联数据
  },
  exhibition: {
    list: '/open/exhibition', // 展览列表
    detail: '/open/exhibition/%s', // 展览详情
    exhibits: '/open/exhibition/relics/relation' // 展览关联展品
  },
  relics: {
    cate: 'open/relicsType/all', // 文物分类
    list: '/open/relics', // 文物列表
    detail: '/open/relics/%s' // 文物详情
  },
  news: { //首页
    list: '/notice/list', //通知公告
    notice: '/notice/detail', // 公告x详情
    newsdetail: '/open/information/%s', // 资讯详情
    noticedetail: '/open/announcement/%s' // 公告详情
  },
  appointment: {
    datelist: '/open/appointment/count', // 预约价格
    list: '/open/appointment/me', // 预约列表
    detail: '/open/appointment/%s', // 预约详情
    price: '/open/appointment/day', // 预约价格
    timelist: '/open/appointment/time', // 预约时间
    submit: '/open/appointment', // 提交预约
    persondata: '/open/appointment/contact/user', // 联系人
    personlist: '/open/appointment/contact/user/me', // 联系人列表
    persondetail: '/open/appointment/contact/user/%s', // 联系人详情
    cancel: '/open/appointment/cancel', //取消预约
    ticket: '/open/appointment/ticket' //购票提醒
  },
  information: {
    detail: '/open/visitors/detail' // 参观须知
  },
  common: {
    thumbstatus: '/open/currency/detail', // 查看是否点赞
    thumb: '/open/currency/thumbs', // 点赞
    slide: '/open/slide', // 轮播图
    update: '/open/mapPoint' // 热更新
  }
}

export default $jsonurl
