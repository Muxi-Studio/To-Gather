
module.exports = {
    baseUrl: process.env.NODE_ENV === 'production' ? 'https://static.muxixyz.com/to-gather/' : '/', 
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
        },
    },
    filenameHashing: false
}