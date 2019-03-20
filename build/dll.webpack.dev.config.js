/**
 * @file dll.webpack.dev.confog.js
 * @author zhangfuling
 */
const path = require('path');
const webpack = require('webpack');
const ROOT_PATH = path.resolve(__dirname, '..');
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const DIST_PATH = path.resolve(ROOT_PATH, 'dist');

const vendors = [
    'react',
    'react-dom',
    'react-router',
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
    mode: 'development',
    module: {
        rules: require('./loaders.dll')
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.resolve(DIST_PATH, 'lib', 'manifest.json'), // manifest文件的输出路径
            name: '[name]_lib', // dll暴露的对象名，要跟output.library保持一致
            context: ROOT_PATH // context是解析包路径的上下文
        })
    ]
};
