const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const preprocess = require('svelte-preprocess');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    entry: {
        index: path.resolve(__dirname, './svelte/index.js'),
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
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template:  path.join(__dirname, './index.html'),
            filename: `index.html`,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                        }
                    },
                ]
            },
            {
                test: /\.svelte$/,
                use: [
                {
                    loader: 'svelte-loader',
                    options: {
                        emitCss: false,
                        compileOptions: { 
                            css: false 
                        } 
                    }
                },
                {
                    loader: 'assets-loader',
                }
            ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]

    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue': '@vue/runtime-dom',
        }
    },
    resolveLoader: {
        alias: {
          'assets-loader':  path.resolve(__dirname, './loaderStyle.js'),
        },
    },
    experiments: {
        topLevelAwait: true
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                extractComments: false,
            }),
            new CssMinimizerPlugin(),
        ],
        splitChunks: {
            name: 'vendors',
            chunks: 'all',
            filename: '[name].[contenthash].js'
        },
        minimize: true,

    },
}