const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/conways-game-of-life/',
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/scss/_variables.scss";
        `
      }
    }
  }
})
