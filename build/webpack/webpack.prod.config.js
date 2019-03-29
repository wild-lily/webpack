const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const webpackConfig = require('./webpack.base.config.js')
const ROOT_PATH = path.resolve(__dirname, '../../')
const SRC_PATH = path.resolve(ROOT_PATH, 'src')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
// 粉笔
const chalk = require('chalk')
// loading效果
const ora = require('ora')
// 命令操作
require('shelljs/global')

console.log(chalk.green.bold('当前运行：' + chalk.underline.green(process.env.NODE_ENV)))

const spinner = ora('正在构建项目...')
spinner.start()

const config = merge(webpackConfig, {
    mode: 'production',
    output: {
        path: path.resolve(ROOT_PATH, 'dist'),
        filename: 'js/[name].[chunkhash].js',
        chunkFilename: 'js/[name].[chunkhash].js'
    },
    plugins: [
        new webpack.DefinePlugin({
            // 定义全局变量
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[contenthash].css',
            chunkFilename: 'css/[contenthash].css'
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
        ),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        // 根据模块调用次数，给模块分配ids，常被调用的ids分配更短的id，使得ids可预测，降低文件大小
        new webpack.optimize.OccurrenceOrderPlugin()
    ],
    devtool: 'source-map',
    module: {
        rules: require('./loaders.prod')
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
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
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    }
})

webpack(config, function(err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n')
    console.log(chalk.green.bold('build finish!'))
})