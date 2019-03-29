const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const templateList = require('./templateList')
const ROOT_PATH = path.resolve(__dirname, '../../');
const SRC_PATH = path.resolve(ROOT_PATH, 'src')
const DIST_PATH = path.resolve(ROOT_PATH, 'dist')
const NODE_BUILD = process.env.NODE_BUILD || ''
let entry = {
    common: [
        './src/styles/index.css'
    ]
}
let plugins = [
    new webpack.DllReferencePlugin({
        manifest: require(path.resolve(DIST_PATH, 'lib', 'manifest.json')),
        context: ROOT_PATH
    }),
    new webpack.ProvidePlugin({
        $: 'jquery'
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new LodashModuleReplacementPlugin()
]


// 构建模板
if (NODE_BUILD) {
    if (!templateList[NODE_BUILD]) {
        throw new Error('没有这个文件')
        return
    }
    const ITEM = templateList[NODE_BUILD]
    entry[NODE_BUILD] = ITEM.entry
    plugins.push(new HtmlWebpackPlugin({
        filename: ITEM.filename,
        template: ITEM.template,
        inject: true,
        chunks: ITEM.chunks
    }))
} else {
    for (let item in templateList) {
        const ITEM = templateList[item]
        entry[item] = ITEM.entry
        plugins.push(new HtmlWebpackPlugin({
            filename: ITEM.filename,
            template: ITEM.template,
            inject: true,
            chunks: ITEM.chunks
        }))
    }
}

module.exports = {
    entry,
    output: {
        // path: path.resolve(__dirname, '/dist'),
        path: DIST_PATH,
        filename: 'js/[name].[hash:5].js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.scss', '.css', '.less'],
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
    },
    optimization: {
        splitChunks: {
            name: 'common'
        }
    },
    plugins,
    module: {
        rules: null
    }
}