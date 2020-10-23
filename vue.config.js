module.exports = {
  devServer: {
    proxy:
      {
        '^/api': {
          target: 'http://192.168.0.131:4500',
          changeOrigin: true,
          secure:false,
          pathRewrite: {'^/api': '/api'}
      },
    },
  }
}


