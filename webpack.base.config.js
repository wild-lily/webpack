const path = require('path');
const webpack = require('webpack');

const ROOT_PATH = path.resolve(__dirname);
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
    entry: {
        index: path.resolve(SRC_PATH, 'index.js')
    },
    output: {
        path: BUILD_PATH,
        filename: 'js/[name].[hash:5].js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.scss', '.css']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: SRC_PATH,
                exclude: path.resolve(ROOT_PATH, 'node_modules')
            }
        ]
    },
    plugins: [
        new webpack.DllReferencePlugin({
            manifest: require(path.resolve(BUILD_PATH, 'lib', 'manifest.json')),
            context: ROOT_PATH
        })
    ]
};
