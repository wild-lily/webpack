/**
 * @file vendor.dll.js
 * @author zhangfuling
 */

var dllDevWebpackConfig = require('../build/dll.webpack.dev.config');
var webpack = require('webpack');
var compilerDev = webpack(dllDevWebpackConfig);

compilerDev.run(function(err){
    if(err){
        console.log(err)
        return;
    }
    console.log('dll for Development bundle 编译完成....')
})

var dllProdWebpackConfig = require('../build/dll.webpack.prod.config');
var webpack = require('webpack');
var compilerDev = webpack(dllProdWebpackConfig);

compilerDev.run(function(err){
    if(err){
        console.log(err)
        return;
    }
    console.log('dll for Production bundle 编译完成....')
})