/**
 * @file webpack.prod.config.js
 * @author zhangfuling
 */

const path = require('path');
const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const ROOT_PATH = path.resolve(__dirname, '..');
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const chalk = require('chalk');
const prodConfig = merge(baseConfig, {
    mode: 'production',
    module: {
        rules: require('./loaders.prod')
    },
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            // 定义全局变量
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
            }
        }),
        new HtmlwebpackPlugin({
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                removeAttributeQuotes: true
            }
        }),
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(SRC_PATH, 'assets'),
            to: './assets',
            ignore: ['.*']
        }]),
        new ProgressBarPlugin(
            {
                format: 'build[:bar]' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
            }
        )
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
});

module.exports = prodConfig;
