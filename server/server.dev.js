var WebpackDevServer = require('webpack-dev-server')
var _ = require('underscore-contrib')
var config = require('../build/webpack.dev.config')
var webpack = require('webpack')
_.map(config.entry, function(value, key) {
    config.entry[key] = [
        'webpack-dev-server/client?http://127.0.0.1:8080/',
        'webpack/hot/dev-server',
        value
    ];
})
config.output.publicPath = 'http://localhost:8080/dist'
config.plugins = (config.plugins || []).concat([
    new webpack.HotModuleReplacementPlugin()
])
var compiler = webpack(config)
var server = new WebpackDevServer(compiler, {
    hot: true,
    noInfo: true,
    filename: config.output.filename,
    publicPath: config.output.publicPath,
    stats: {colors: true}
})
server.listen(8080, '127.0.0.1', function() {
    console.log('Listening at http://127.0.0.1:8080')
})