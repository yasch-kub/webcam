var webpack = require('webpack'),
    path = require('path');

module.exports = {
    devtools: 'eval',
    entry: [
        `webpack-dev-server/client?http://localhost:${process.env.PORT || 3000}/`,
        'webpack/hot/only-dev-server',
        './src/index'
    ],

    output: {
        path: __dirname,
        filename: 'bundle.js',
        publicPath: ''
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],

    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot', 'babel'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.sass$/,
                loaders: ['style', 'css', 'sass']
            }
        ]

    },

    devServer: {
        port: process.env.PORT || 3000,
        host: 'localhost',
        hot: true,
        proxy: [{
            path: /users\/*|messages\/*/,
            target: 'http://localhost:3333'
        }]
    }
};