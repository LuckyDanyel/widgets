const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: {
        widgetsInit: path.resolve(__dirname, './vue/widgetsInit.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        chunkFilename: '[name].[contenthash].js', // chunkFilename - преднозначен для компонентов с ленивой загрузкой
        filename: '[name].js',
        library: 'widgetsInit',
        libraryExport: 'default',
        libraryTarget: 'umd',
    },
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]

    },
    resolve: {
        extensions: ['*', '.js']
    },
    experiments: {
        topLevelAwait: true
    },
    optimization: {
        minimizer: [new TerserPlugin({
          extractComments: false,
        })],
    },
}