/**
 * @file webpack.dev.config.js
 * @author zhangfuling
 */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const apiMocker = require('mocker-api');
const baseConfig = require('./webpack.base.config.js');
const ROOT_PATH = path.resolve(__dirname, '..');
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const DIST_PATH = path.resolve(ROOT_PATH, 'dist');

const devConfig = merge(baseConfig, {
    mode: 'development',
    devtool: 'eval-source-map',
    module: {
        rules: require('./loaders.dev')
    },
    devServer: {
        contentBase: DIST_PATH,
        port: 3000, // 本地服务器端口号
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
            },
            '/detail': ''
        },
        before(app) {
            apiMocker(app, path.resolve(ROOT_PATH, 'mock', 'mock.js'));
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});

module.exports = devConfig;
