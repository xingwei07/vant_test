module.exports = {
  // roductionSourceMap: false, // 不需要生产环境的 source map 以加速生产环境构建
  publicPath: './', // 可以被设置为空字符串 ('') 或是相对路径 ('./')，这样所有的资源都会被链接为相对路径
  outputDir: 'dist', // 生成的生产环境构建文件的目录
  assetsDir: 'static' // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
}