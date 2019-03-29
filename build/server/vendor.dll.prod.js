/**
 * @file vendor.dll.js
 * @author zhangfuling
 */

const dllProdWebpackConfig = require('../webpack/dll.webpack.prod.config');
const webpack = require('webpack');
const compilerProd = webpack(dllProdWebpackConfig);

compilerProd.run(function(err) {
    if (err) {
        console.log(err)
        return;
    }
    console.log('dll for Production bundle 编译完成....');
})