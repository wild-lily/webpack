/**
 * @file webpack.base.config.js
 * @author zhangfuling
 */

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ROOT_PATH = path.resolve(__dirname, '..');
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const DIST_PATH = path.resolve(ROOT_PATH, 'dist');

module.exports = {
    entry: {
        index: path.resolve(SRC_PATH, 'index.js')
    },
    output: {
        path: DIST_PATH,
        filename: 'js/[name].[hash:5].js',
        publicPath: ''
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.scss', '.css', '.less'],
        alias: {

        }
    },
    module: {
        rules: null
    },
    plugins: [
        new webpack.DllReferencePlugin({
            manifest: require(path.resolve(DIST_PATH, 'lib', 'manifest.json')),
            context: ROOT_PATH
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new HtmlwebpackPlugin({
            title: 'react-webpack-demo',
            filename: 'index.html',
            template: path.resolve(SRC_PATH, 'templates', 'index.html')
        }),
        new webpack.ProvidePlugin({
            $: 'jquery'
        })
    ]
};
