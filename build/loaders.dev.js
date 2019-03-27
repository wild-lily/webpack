/**
 * @file loaders.dev.js
 * @author zhangfuling
 */
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ROOT_PATH = path.resolve(__dirname, '..');
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const DIST_PATH = path.resolve(ROOT_PATH, 'dist');

module.exports = [
    {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        loader: ['babel-loader', 'eslint-loader'],
        include: path.resolve(__dirname, SRC_PATH),
        exclude: /node_modules/
    },
    {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
    },
    {
        test: /\.less$/,
        use: [
            {
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
    },
    {
        test: /\.(jpg|png|gif|bmp|jpeg)$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 8192, // 限制打包图片的大小：
                    // 如果大于或等于8192Byte，则按照相应的文件名和路径打包图片；如果小于8192Byte，则将图片转成base64格式的字符串。
                    name: 'images/[name]-[hash:8].[ext]' // images:图片打包的文件夹；
                    // [name].[ext]：设定图片按照本来的文件名和扩展名打包，不用进行额外编码
                    // [hash:8]：一个项目中如果两个文件夹中的图片重名，打包图片就会被覆盖，加上hash值的前八位作为图片名，可以避免重名。
                }
            }
        ]
    }
];
