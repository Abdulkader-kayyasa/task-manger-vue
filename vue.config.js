const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  devServer : {
    proxy: {
      '^/api' :{
        target:'https://task-tracker-backend2.herokuapp.com',
        changweOrigin:true,
        logLevel:'debug',
        pathRewrite: {'^/api': '/'}
      }
    }
  }
}

