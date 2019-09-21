const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'postcss-loader']
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'html-loader',
                    options: {minimize: false}
                }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
                use: [{
                    loader: 'file-loader',
                    options: {outputPath: 'fonts/', name: '[name].[ext]',}
                }]
            }
        ]
    },
    devServer: {
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            favicon: './src/favicon.ico',
        }),
        new MiniCssExtractPlugin({
            filename: "styles.css",
        }),
        new CopyPlugin([
            {from: './src/.htaccess'}
        ])
    ]
};