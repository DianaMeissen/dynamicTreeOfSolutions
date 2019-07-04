const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const PATHS = {
    build: path.join(__dirname, 'build')
};

module.exports = {
    mode: 'development',
    output: {
        path: PATHS.build,
        filename: '[name].js'
    },
    devtool: 'inline-source-map',
    plugins: [new HtmlWebpackPlugin({
        title: 'Dev',
        template: './index.html'
    }), new webpack.HotModuleReplacementPlugin()],
    devServer: {
        contentBase: './build',
        compress: true,
        port: 9000,
        hot: true
    }
};
