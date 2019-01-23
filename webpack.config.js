const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ServiceWorkerWebpackPlugin = require("serviceworker-webpack-plugin")
const FaviconsWebpackPlugin = require("favicons-webpack-plugin")
const ManifestWebpackPlugin = require("webpack-manifest-plugin")
const path = require("path")

module.exports = {
    devtool: 'cheap-module-source-map',
    devServer: {
        host: '0.0.0.0',
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
        new ServiceWorkerWebpackPlugin({
            entry: path.join(__dirname, "./src/firebase-messaging-sw.js"),
            filename: "firebase-messaging-sw.js"
        }),
        new FaviconsWebpackPlugin({
            logo: "./assets/icon.png",
            inject: true,
            icons: {
                favicons: true,
                android: true
            }
        }),
        new ManifestWebpackPlugin({
            seed: {
                gcm_sender_id: "103953800507"
            }
        }),
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
            },
            {
                test: /\.worker\.js$/,
                use: { loader: 'worker-loader' }
            }
        ]
    }
}