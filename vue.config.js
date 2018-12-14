module.exports = {
    baseUrl: '/',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://119.23.79.87:1999/',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                  '^/api': '/api'
                }
            }
        }
    }
}