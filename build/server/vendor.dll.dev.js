/**
 * @file vendor.dll.js
 * @author zhangfuling
 */

const dllDevWebpackConfig = require('../webpack/dll.webpack.dev.config');
const webpack = require('webpack');
const compilerDev = webpack(dllDevWebpackConfig);

compilerDev.run(function(err) {
    if (err) {
        console.log(err)
        return;
    }
    console.log('dll for Development bundle 编译完成....');
})
