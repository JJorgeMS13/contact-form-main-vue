const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/contact-form-main-vue': '/',
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/css/variables.scss";`
      }
    }
  }
})
