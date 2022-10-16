const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, dirname) => {
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
            splitChunks: {
                name: 'vendors',
                chunks: 'async',
                filename: '[name].js',
            },
        },
    }
}   