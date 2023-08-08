const { defineConfig } = require('@vue/cli-service')
const resolve =dir=>require('path').join(__dirname, dir)
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: 'localhost',
    port: 9000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://rap2api.taobao.org/app/mock/313582',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  },
  lintOnSave: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@a', resolve('src/assets'))
      .set('@c', resolve('src/components'))
      .set('@v', resolve('src/views'))
      .set('@u', resolve('src/utils'))
      .set('@l', resolve('src/layout'))
      .set('@api', resolve('src/api'))
  }
})
