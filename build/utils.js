var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var glob = require('glob')

var pageExtractCssArray = []
exports.assetsPath = function(_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production' ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.getEntry = function() {
  let globPath = 'src/**/*.ejs'
  // (\/|\\\\) 这种写法是为了兼容 windows和 mac系统目录路径的不同写法
  let pathDir = 'src(\/|\\\\)(.*?)'
  let files = glob.sync(globPath)
  // console.log(files)
  let dirname, entries = []
  for (let i = 0; i < files.length; i++) {
    dirname = path.dirname(files[i])
    if (dirname !== 'src/common')
      entries.push(dirname.replace(new RegExp('^' + pathDir), '$2'))
  }
  // console.log(entries)
  return entries
}

exports.getEntry().forEach(item => {
  pageExtractCssArray.push(new ExtractTextPlugin(exports.assetsPath('css/[name].css')))
})

exports.pageExtractCssArray = pageExtractCssArray

exports.cssLoaders = function(options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      // minimize: process.env.NODE_ENV === 'production',
      minimize: false,
      autoprefixer: false,
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    var loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    // if (options.extract) {
    //   return ExtractTextPlugin.extract({
    //     use: loaders,
    //     fallback: 'style-loader'
    //   })
    // } else {
    //   return ['style-loader'].concat(loaders)
    // }
    if (options.extract) {
      return loaders
    } else {
      return ['style-loader'].concat(loaders)
    }
  }

  // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function(options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]

    if (Object.prototype.toString.call(loader) !== '[object Array]') {
      loader = loaders[extension].split('!')
    }

    var isPreProcesser = ['less', 'sass', 'scss', 'stylus', 'styl'].some(function(v) {
      return v === extension
    })

    if (isPreProcesser) {
      // 之前是loader.splice(3, 0, 'postcss') 有错误，应该在sass loader 后,导致karma运行失败 嚓
      loader.splice(-1, 0, {
        loader: 'postcss-loader',
        options: {
          sourceMap: options.sourceMap,
          plugins: function() {
            return [
              require('autoprefixer')({
                browsers: [
                  '> 1%',
                  'last 10 versions',
                  'not ie <= 8'
                ]
              })
            ]
          }
        }
      })
    }

    // console.log(JSON.stringify(loader))

    output.push({
      test: new RegExp('\\.' + extension + '$'),
      include: [path.join(__dirname, '..', 'node_modules')],
      use: loader
    })

    exports.getEntry().forEach((item, i) => {
      output.push({
        test: new RegExp('src(\\\\|\/)' + item + '(\\\\|\/)' + '.*\.' + extension + '$'),
        use: options.extract ? pageExtractCssArray[i].extract({
          fallback: 'style-loader',
          use: loader
        }) : loader
      })
    })

  }
  // console.log(output)
  return output
}
