/**
 * @file dll.webpack.prod.config.js
 * @author zhangfuling
 */
const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ROOT_PATH = path.resolve(__dirname, '../../');
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const DIST_PATH = path.resolve(ROOT_PATH, 'dist');

const vendors = [
    'react',
    'react-dom',
    'react-router-dom',
    'mobx',
    'mobx-react'
];

module.exports = {
    entry: {
        vendor: vendors
    },
    output: {
        path: path.resolve(DIST_PATH, 'lib'),
        filename: '[name].dll.js',
        library: '[name]_lib'
    },
    mode: 'production',
    module: {
        rules: require('./loaders.dll')
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.resolve(DIST_PATH, 'lib', 'manifest.json'), // manifest文件的输出路径
            name: '[name]_lib', // dll暴露的对象名，要跟output.library保持一致
            context: ROOT_PATH // context是解析包路径的上下文
        }),
        new webpack.DefinePlugin({
            // 定义全局变量
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
            }
        })
    ],
    optimization: {
        minimizer: [new UglifyJsPlugin({
            uglifyOptions: {
                // 最紧凑的输出
                beautify: false,
                // 删除所有的注释
                comments: false,
                compress: {
                    warnings: false, // 警告开关
                    drop_console: true,
                    // 内嵌定义了但是只用到一次的变量
                    collapse_vars: true,
                    // 提取出出现多次但是没有定义成变量去引用的静态值
                    reduce_vars: true
                }
            }
        })]
    }
};
