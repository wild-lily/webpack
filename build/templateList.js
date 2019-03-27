module.exports = {
    home: {
        entry: './src/pages/Home/index.js',
        filename: './index.html',
        template: './src/templates/home.html',
        chunks: ['home']
    },
    login: {
        entry: './src/pages/Login/index.js',
        filename: './index.html',
        template: './src/templates/login.html',
        chunks: ['login']
    }
}