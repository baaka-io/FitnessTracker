const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const FaviconsWebpackPlugin = require("favicons-webpack-plugin")
const Webpack = require("webpack")

module.exports = {
    devtool: 'cheap-module-source-map',
    devServer: {
        contentBase: './dist',
        historyApiFallback: true
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: '200.html'
        }),
        new FaviconsWebpackPlugin({
            logo: "./assets/icon.png",
            inject: true,
            icons: {
                favicons: true,
                android: true
            }
        }),
        new Webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.html/,
                use: 'html-loader',
                exclude: /node_modules/
            },
            {
                test: /\.toml/,
                use: 'toml-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    }
}