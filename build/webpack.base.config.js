const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ROOT_PATH = path.resolve(__dirname, "..");
const SRC_PATH = path.resolve(ROOT_PATH, "src");
const DIST_PATH = path.resolve(ROOT_PATH, "dist");
module.exports = {
    entry: {
        index: path.resolve(SRC_PATH, "index.js")
    },
    output: {
        path: DIST_PATH,
        filename: "js/[name].[hash:5].js"
    },
    resolve: {
        extensions: [".js", ".jsx", ".json", ".scss", ".css", ".less"]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                enforce: "pre",
                loader: ["babel-loader", "eslint-loader"],
                include: path.resolve(__dirname, SRC_PATH),
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            modules: true,
                            localIdentName: "[local]___[hash:base64:5]"
                        }
                    },
                    {
                        loader: "less-loader"
                    }
                ]
            },
            {
                test: /\.(jpg|png|gif|bmp|jpeg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8192, // 限制打包图片的大小：
                            // 如果大于或等于8192Byte，则按照相应的文件名和路径打包图片；如果小于8192Byte，则将图片转成base64格式的字符串。
                            name: "images/[name]-[hash:8].[ext]" // images:图片打包的文件夹；
                            // [name].[ext]：设定图片按照本来的文件名和扩展名打包，不用进行额外编码
                            // [hash:8]：一个项目中如果两个文件夹中的图片重名，打包图片就会被覆盖，加上hash值的前八位作为图片名，可以避免重名。
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DllReferencePlugin({
            manifest: require(path.resolve(DIST_PATH, "lib", "manifest.json")),
            context: ROOT_PATH
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
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
