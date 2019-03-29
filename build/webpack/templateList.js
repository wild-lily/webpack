/**
 * entry 模板使用js 入口文件
 * filename 模板出口文件
 * template 模板入口文件
 * chunks 模板使用的全部js文件
 * 
 * 指定构建模板
 * export NODE_BUILD=index&&npm run build
 */

module.exports = {
    index: {
        entry: './src/pages/index/index.js',
        filename: './index.html',
        template: './src/template/index/index.html',
        chunks: ['index', 'common']
    },
    list: {
        entry: './src/pages/list/index.js',
        filename: './list.html',
        template: './src/template/list/index.html',
        chunks: ['list']
    }
}