module.exports = {
  lintOnSave: false,
  publicPath: './',
  assetsDir: 'static',
  devServer: {
    open: true, // 是否自动弹出浏览器页面
    host: 'localhost',
    port: '8081\\\\\\\\\\\\',
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        target: 'http://10.1.10.211', // API服务器的地址
        changeOrigin: true, // 虚拟的站点需要更管origin
        pathRewrite: { // 重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
          '^/api': ''
        }
      }
    }
  }
}
