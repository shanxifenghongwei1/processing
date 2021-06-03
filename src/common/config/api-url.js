const $jsonurl = {
  bank: {
    list: '/open/sys/dict' // [GET] 银行卡列表
  },
  user: {
    login: '/weChat', // 登录
    newaddress:'/user/Addaddress', //新增地址
    address:'user/addresslist', // 地址别表
    deleaddress:'user/deleaddress', //删除地址
    updateaddress:'user/updateaddress', //修改地址
    deteaddress:'user/deteaddress', // 地址详情
    defaults:'user/default', // 默认地址修改
    morenaddress:'/user/defauladd' , //查询默认地址
    pricesort:'acc/pricesort',   // 价格排序 
    userhave:'/shop/getCoup', // 用户是否有可用优惠券
    // 个人中心
    meiqiorderlist:'/order/gas/list', // 煤气订单
    meiqiorderdetial:'/order/gas/detail', // 煤气订单详情
    meiqiquxiaodingdan:'/order/gas/cancel', // 煤气取消订单
    meiqidingdanpingjia:'order/comment', // 煤气订单评价
    myconponlist:'user/coupont', // 我的优惠券
    pjorderlist: 'order/partslist', // 配件订单列表
    pjorderdetial:'order/partsdetail', //配件订单详情
    pjquerenshouhuo:'order/sondo',  // 配件，确认收货
    pjpingjia:'order/partsevaluate' // 配件 评价
    
    
  },
  goods:{
    search: '/acc/search', // 商品搜索
    leftlist:'/acc/accessoriesmall', // 分类的所有数据
    productsall:'/acc/productsall', // 搜索商品
    sales:'/acc/sales',   // 销量 配件
    goodsdetails:'/acc/goodsdetails', // 获取商品详情
    specs:'/acc/specs',  // 获取sku
    pushsku:'/acc/sku',  // 选择sku
    ordermoney:'/shop/order',   // 下单
    goodscommit:'/acc/singleeva',  // 商品评价
    allcommit:'/acc/evaluate' ,  // 全部商品评价
    pjlist: '/acc/evaluatelabel', // 好评中频差评
    baforepay:'/wx/pay', // 微信支付前必要数据
    olduserdingqi: '/order/onekey',// 老用户一件定气
    meiqituiping:'/order/vase', // 退瓶抢修列表
    meiqitui: '/order/returnVase', // 退瓶接口
    meiqishanchutuipin: '/order/delVase'  // 退瓶的删除接口
  },
  news: { //首页
    list: '/notice/list', //通知公告
    notice: '/notice/detail', // 公告x详情
    nearby:'/shop/nearby', //首页附近商家
    banner:'shop/banner', // 轮播图
    business:'/shop/business', // 商业用气
    pipeline:'/shop/pipeline', //燃气管道
    shopdetail :'/shop/detail', //店铺详情
    goodsall:'acc/goodsall', // 店铺下的商品
    shopcomment: 'shop/comment', //店铺评价
    shopallComment:'/shop/allComment' , //全部评价
    userrepair:'/shop/repair', //抢修
    shopcoupon:'/shop/coupon' ,  // 店铺优惠券
    getcoupon:'/shop/getCoupon', // 获取优惠券
    pjshopdetial: '/acc/shopdetail', //配件店铺详情
    pjhotgoods:'acc/hotgoods',  //配件 热门商品
    pjgoodsall: '/acc/goodsall', //配件 全部商品
    pgpay: 'acc/accorder', // 配件点击下单
    // 骑手端
    qishoulogin: '/user/login', // 骑手登录
    qishouenter: '/horseman/enter', // 骑手填写信息
    qishoureceiving:'/horseman/receiving_list', // 骑手端接单台列表
    qishoudorder: '/horseman/order_detail', // 骑手端订单详情
    qishoudetial:'horseman/personal', // 骑手个人信息
    qishoumyorder:'/horseman/horseman_order', //   骑手，我的订单接口
    qishoujiedan: '/horseman/receiving', //   骑手 接单
    qishouzhuangtai: '/horseman/order_status', //骑手 改变订单状态
    qishouticheng:'horseman/royalty', // 骑手 查看提成
     
    // 商家入驻
    shanghuruzhusongqi:'/shop/enter', //送气



    
    newsdetail: '/open/information/%s', // 资讯详情
    noticedetail: '/open/announcement/%s' // 公告详情
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
