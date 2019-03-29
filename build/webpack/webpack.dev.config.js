const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const webpackConfig = require('./webpack.base.config.js')
const WebpackNotifierPlugin = require('webpack-notifier')
const apiMocker = require('mocker-api')
const ROOT_PATH = path.resolve(__dirname, '../../')
const SRC_PATH = path.resolve(ROOT_PATH, 'src')
const DIST_PATH = path.resolve(ROOT_PATH, 'dist')

// webpack hot reload 配置
Object.keys(webpackConfig.entry).forEach(function(name) {
    webpackConfig.entry[name] = ['webpack-hot-middleware/client?noInfo=true&reload=true'].concat(webpackConfig.entry[name])
})

module.exports = merge(webpackConfig, {
    mode: 'development',
    module: {
        rules: require('./loaders.dev')
    },
    devServer: {
        contentBase: DIST_PATH,
        port: 8080, // 本地服务器端口号
        hot: true, // 热重载
        hotOnly: true,
        overlay: true, // 如果代码出错，会在浏览器页面弹出“浮动层”。类似于 vue-cli 等脚手架
        proxy: {
            // 跨域代理转发
            '/api': {
                target: 'https://m.weibo.cn',
                changeOrigin: true,
                logLevel: 'debug',
                headers: {
                    Cookie: ''
                }
            }
        },
        before(app) {
            apiMocker(app, path.resolve(ROOT_PATH, 'mock', 'mock.js'));
        }
    },
    devtool: 'eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: '"development"'},
            'DEV': true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        // 标签提示构建信息
        new WebpackNotifierPlugin({alwaysNotify: true})
    ]
})