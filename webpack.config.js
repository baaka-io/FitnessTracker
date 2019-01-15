const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    devtool: 'cheap-module-source-map',
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Fitness Tracker - Baaka.io',
            template: 'index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss/,
                use: [
                    'to-string-loader',
                    'css-loader', 
                    'sass-loader'
                ],
                exclude: /node_modules/
            }
        ]
    }
}