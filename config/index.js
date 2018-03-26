// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var chalk = require('chalk')
var fs = require('fs')
var devConfig = {}
var devConfigUrl = path.resolve(__dirname, './dev.local.js')

if (fs.existsSync(devConfigUrl)) {
  devConfig = require(devConfigUrl)
} else {
  console.log('Warning: ', devConfigUrl, chalk.red(' not exist'))
}

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    //${tag-begin-assetsPublicPath}
    assetsPublicPath: './',
    //${tag-end-assetsPublicPath}
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: devConfig
}
