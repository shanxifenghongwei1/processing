const path = require('path')
const VConsolePlugin = require('vconsole-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: true,
  configureWebpack: config => {
    return {
      plugins: [
        new VConsolePlugin({
          filter: [],
          enable: process.env.NODE_ENV !== 'production'
        })
      ],
      resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
          '@': resolve('src'),
          'src': resolve('src'),
          'common': resolve('src/common'),
          'service': resolve('src/common/service'),
          'utils': resolve('src/common/utils'),
          'config': resolve('src/common/config'),
          'components': resolve('src/components')
        }
      }
    }
  },
  // devServer: {
  //   // 配置转发代理
  //   // open: true, // 是否打开浏览器
  //   port: 8080,
  //   overlay: {
  //     warnings: true,
  //     errors: true
  //   },
  //   disableHostCheck: true,
  //   proxy: {
  //     '/api': {
  //       target: 'http://10.10.1.131:8087/', // 需要跨域的域名
  //       changeOrigin: true,
  //       secure: false, // 设置支持https协议的代理
  //       pathRewrite: {
  //         '^/api': '/api' // 匹配请求路径里面有 /api 替换成 https://api.offerago.com/api
  //       }
  //     }
  //   }
  // }
}
