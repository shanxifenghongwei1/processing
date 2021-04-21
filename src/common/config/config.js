export default {
  // service: process.env.NODE_ENV === 'production' ? '/api' : '/api',
  // service: 'https://guideapi.transnal.com/api',
  // service: 'http://10.10.1.98:8087/api',
  // service: 'http://10.10.1.99:8087/api',
  // service: 'http://10.10.1.7:8190/api',
  // service: 'https://huangyunxin91.utools.club/api',
  service: 'http://coalwas.gege12.vip',
  imageUrl:
    process.env.NODE_ENV === 'production'
      ? 'https://tybwgdl.oss-cn-zhangjiakou.aliyuncs.com/'
      : 'https://tybwgdl.oss-cn-zhangjiakou.aliyuncs.com/',
  imageUploadUrl:
    process.env.NODE_ENV === 'production'
      ? 'https://bookparadise.oss-cn-zhangjiakou.aliyuncs.com'
      : 'https://bookparadise.oss-cn-zhangjiakou.aliyuncs.com',
  appid: 'wx265f395e485158a4',
  Authorization: 'Basic d2ViOndlYl9zZWNyZXQ='
}
