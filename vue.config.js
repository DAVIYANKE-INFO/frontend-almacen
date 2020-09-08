module.exports = {
  devServer: {
    proxy:
      {
        '^/api': {
          target: 'http://192.168.0.130:4500',
          changeOrigin: true,
          secure:false,
          pathRewrite: {'^/api': '/api'}
      },
    },
  }
}


