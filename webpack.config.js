const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const sveltePreprocess = require('svelte-preprocess');
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const postcss = require('postcss')
const postcssCssnext = require('postcss-cssnext')
const postcssImport = require('postcss-import')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const cssLoader = require('css-loader');

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
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'assets-loader'
                    },
                    // {
                    //     loader: 'style-loader',
                    // },
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: true,
                        }
                    },
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.svelte$/,
                use: [
                  {
                    loader: 'svelte-loader',
                    options: {
                        compilerOptions: {
                            css: false,
                        }
                    }
                  }
                ]
              },
            {
                test: /\.(png|jpg|gif)/,
                type: 'asset/resource'
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
            chunks: 'async',
            filename: '[name].[contenthash].js'
        },
        minimize: true,

    },
}