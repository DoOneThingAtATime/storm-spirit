module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        bypass: function (req, res) {
          if (req.headers.accept.indexOf('html') !== -1) {
            console.log('Skipping proxy for browser request.')
            return '/index.html'
          } else if (process.env.MOCK === 'true') {
            if (req.path === '/favicon.ico') return
            const name = req.path.split('/api/')[1].split('/').join('_')
            const mock = require(`./mock/${name}`)
            const result = mock(req.method)
            delete require.cache[require.resolve(`./mock/${name}`)]
            return res.send(result)
          }
        }
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
}
