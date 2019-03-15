const path = require('path');
const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const UglifyPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');

const ROOT_PATH = path.resolve(__dirname);
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = path.resolve(ROOT_PATH, 'build');
const devConfig = merge(baseConfig, {
    mode: 'development',
    devtool: 'eval-source-map',
    module: {
        rules: [{
            test: /\.css$/,
            include: SRC_PATH,
            use: [
                'style-loader', 'css-loader'
            ]
        },
        {
            test: /\.less$/,
            use: [{
                loader: 'style-loader'
            },
            {
                loader: 'css-loader',
                options: {
                    sourceMap: true,
                    modules: true,
                    localIdentName: '[local]___[hash:base64:5]'
                }
            },
            {
                loader: 'less-loader'
            }
            ]
        }
        ]
    },
    plugins: [
        new HtmlwebpackPlugin({
            title: 'react-webpack-demo',
            filename: 'index.html',
            template: path.resolve(SRC_PATH, 'templates', 'index.html')
        }),
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
        new UglifyPlugin()
    ],
    devServer: {
        contentBase: path.resolve(ROOT_PATH, 'build'),
        port: 3000, // 本地服务器端口号
        hot: true, // 热重载
        overlay: true, // 如果代码出错，会在浏览器页面弹出“浮动层”。类似于 vue-cli 等脚手架
        proxy: {
            // 跨域代理转发
            '/comments': {
                target: 'https://m.weibo.cn',
                changeOrigin: true,
                logLevel: 'debug',
                headers: {
                    Cookie: ''
                }
            }
        }
    }
});

module.exports = devConfig;
