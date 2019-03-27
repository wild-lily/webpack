module.exports = {
    '/api': {
        target: 'https://m.weibo.cn',
        changeOrigin: true,
        logLevel: 'debug',
        headers: {
            Cookie: ''
        }
    }
}