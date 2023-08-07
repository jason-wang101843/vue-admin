const { defineConfig } = require('@vue/cli-service')
const resolve =dir=>require('path').join(__dirname, dir)

module.exports = defineConfig({
  transpileDependencies: true,
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
