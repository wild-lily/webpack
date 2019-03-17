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

// todo: 考虑一下 dll 是否需要区分 dev 和 prod 环境，如果需要，为什么需要？
module.exports = {
    entry: {
        vendor: vendors
    },
    output: {
        path: path.resolve(DIST_PATH, 'lib'),
        filename: '[name].dll.js',
        library: '[name]_lib'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.resolve(DIST_PATH, 'lib', 'manifest.json'), // manifest文件的输出路径
            name: '[name]_lib', // dll暴露的对象名，要跟output.library保持一致
            context: ROOT_PATH // context是解析包路径的上下文
        })
    ]
};
