var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlBeautifyPlugin = require('html-beautify-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

var env = process.env.NODE_ENV === 'testing' ?
  require('../config/test.env') :
  config.build.env

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].js'),
    chunkFilename: utils.assetsPath('js/[id].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.HashedModuleIdsPlugin(),
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   },
    //   sourceMap: true
    // }),
    ...utils.pageExtractCssArray,
    // extract css into its own file
    // new ExtractTextPlugin({
    //   filename: utils.assetsPath('css/[name].[contenthash].css')
    // }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin(),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //   filename: config.build.index,
    //   template: 'src/index.ejs',
    //   assetsPublicPath: config.build.assetsPublicPath,
    //   inject: true,
    //   // minify: {
    //   //   removeComments: true,
    //   //   collapseWhitespace: true,
    //   //   removeAttributeQuotes: true
    //   //   // more options:
    //   //   // https://github.com/kangax/html-minifier#options-quick-reference
    //   // },
    //   // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    //   chunksSortMode: 'dependency'
    // }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // copy custom static assets
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../static'),
      to: config.build.assetsSubDirectory,
      ignore: ['.*']
    }])
  ]
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

utils.getEntry().forEach(pathname => {
  let conf = {
    filename: pathname + '.html',
    template: 'ejs-compiled-loader!' + path.join(__dirname, '../src', pathname, 'index.ejs'),
    inject: true,
    chunks: ['manifest', 'vendor', pathname],
    chunksSortMode: 'dependency'
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf))
})

webpackConfig.plugins.push(new HtmlBeautifyPlugin({
  config: {
    html: {
      'allowed_file_extensions': ['htm', 'html', 'xhtml', 'shtml', 'xml', 'svg', 'vue', 'ejs'],
      'brace_style': 'collapse', // [collapse|expand|end-expand|none] Put braces on the same line as control statements (default), or put braces on own line (Allman / ANSI style), or just put end braces on own line, or attempt to keep them where they are
      'end_with_newline': false, // End output with newline
      'indent_char': ' ', // Indentation character
      'indent_handlebars': false, // e.g. {{#foo}}, {{/foo}}
      'indent_inner_html': false, // Indent <head> and <body> sections
      'indent_scripts': 'keep', // [keep|separate|normal]
      'indent_size': 2, // Indentation size
      'max_preserve_newlines': 2, // Maximum number of line breaks to be preserved in one chunk (0 disables)
      'preserve_newlines': true, // Whether existing line breaks before elements should be preserved (only works before elements, not inside tags or for text)
      'unformatted': ['template', 'code', 'pre', 'sub', 'sup', 'em', 'strong', 'b', 'i', 'u', 'strike', 'big', 'small', 'pre'],
      'wrap_line_length': 0 // Lines should wrap at next opportunity after this number of characters (0 disables)
    }
  }
}))

module.exports = webpackConfig
