/**
 * @file webpack.base.config.js
 * @author zhangfuling
 */

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
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
            filename: 'css/[name].css',
            chunkFilename: '[id].css'
        }),
        new HtmlwebpackPlugin({
            title: 'react-webpack-demo',
            filename: 'index.html',
            template: path.resolve(SRC_PATH, 'templates', 'index.html')
        }),
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
        new LodashModuleReplacementPlugin()
    ],
    optimization: {
        splitChunks: {
            chunks: 'async',
            cacheGroups: {
                vendor: {
                    test: /[\\\/]node_modules[\\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        },
        runtimeChunk: true
    }
};
