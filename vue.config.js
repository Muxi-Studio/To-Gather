
module.exports = {
    baseUrl: process.env.NODE_ENV === 'production' ? 'https://static.muxixyz.com/to-gather/' : '/', 
    devServer: {
        proxy: {
            '/api': {
                target: 'http://116.62.7.230:1999/',
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