const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const optimizationCommon = require('./optimization');
const pluginsCommon = require('./plugins');
const moduleCommon = require('./module');

module.exports = (env, dirname) => {
    console.log('svelte config', dirname);
    return {
        entry: {
            index: path.resolve(dirname, './svelte/index.js'),
        },
        output: {
            path: path.resolve(dirname, './dist/svelte'),
            chunkFilename: '[name].[contenthash].js', // chunkFilename - преднозначен для компонентов с ленивой загрузкой
            filename: '[name].js',
            library: 'widgetsInit',
            libraryExport: 'default',
            libraryTarget: 'umd',
        },
        plugins: [
            ...pluginsCommon(dirname),
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css',
                insert: (styles) => {
                    const element = document.createElement('div');
                    element.id = 'travelata-widgets-styles';
                    element.innerHTML = styles;
                }
            })
        ],
        module: {
            rules: [
                ...moduleCommon().rules,
                {
                    test: /\.svelte$/,
                    use: [
                      {
                        loader: 'svelte-loader',
                        options: {
                            emitCss: true,
                            compilerOptions: {
                                css: false,
                            }
                        }
                      },
                    ]
                },
            
            ]

        },
        resolve: {
            extensions: ['.js', '.svelte', '.css'],
            alias: {
                '@svelte': path.resolve(dirname, 'svelte'),
            }
        },
        optimization: {
            minimizer: optimizationCommon().minimizer,
            splitChunks: {
                name: 'vendors',
                chunks: 'async',
                filename: '[name].js',
            },
            minimize: optimizationCommon().minimize,
        },
    }
}   