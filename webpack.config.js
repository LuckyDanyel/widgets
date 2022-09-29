const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
    entry: {
        vue: path.resolve(__dirname, './vue/main.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        chunkFilename: '[name].[contenthash].js', // chunkFilename - преднозначен для компонентов с ленивой загрузкой
        filename: '[name].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:  path.resolve(__dirname, './index.html'),
            chunks: ['vue'],
            filename: 'index_vue.html',
        }),
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new BundleAnalyzerPlugin(),
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
        ]

    },
    optimization: {
        splitChunks: {
            chunks: 'async'
        }
    }
}