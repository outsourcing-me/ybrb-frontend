var https = require('https')

module.exports = {
  env: require('./dev.env'),
  port: 8080,
  autoOpenBrowser: true,
  assetsSubDirectory: 'static',
  assetsPublicPath: '/',
  proxyTable: {
    // '/api/reportManage/': {
    //   target: 'http://10.132.1.183:8080',
    //   changeOrigin: true,
    //   pathRewrite: function(path, req) {
    //     return path.replace('/api/', '/')
    //   }
    // },
    // '/api/reportManage/': {
    //   target: 'http://123.59.44.207:8080/wdy',
    //   changeOrigin: true,
    //   pathRewrite: function(path, req) {
    //     return path.replace('/api/', '/')
    //   }
    // },
    '/api': {
      target: 'http://39.106.175.91:8080/wdy',
      changeOrigin: true,
      onProxyRes: function(proxyRes, req, res) {
        // proxyRes.headers['x-auth-token'] = 'adfa-adsfaf-asf'
        // delete proxyRes.headers['set-cookie'] // 删除Rap上的cookie设置因为会影响到/api/usermanage的cookie设置
      },
      pathRewrite: function(path, req) {
        return path.replace('/api/', '/')
      }
    },
    // '/api': {
    //   target: 'https://kf-wdy-trunk.wjs-test.com/wdy',
    //   secure: false,
    //   agent: https.globalAgent,
    //   changeOrigin: true,
    //   onProxyRes: function(proxyRes, req, res) {
    //     // proxyRes.headers['x-auth-token'] = 'adfa-adsfaf-asf'
    //     // delete proxyRes.headers['set-cookie'] // 删除Rap上的cookie设置因为会影响到/api/usermanage的cookie设置
    //   },
    //   pathRewrite: function(path, req) {
    //     return path.replace('/api/', '/')
    //   }
    // }
  },
  // CSS Sourcemaps off by default because relative paths are "buggy"
  // with this option, according to the CSS-Loader README
  // (https://github.com/webpack/css-loader#sourcemaps)
  // In our experience, they generally work as expected,
  // just be aware of this issue when enabling this option.
  cssSourceMap: true
}
