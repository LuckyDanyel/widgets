const path = require('path');
const { VueLoaderPlugin } = require("vue-loader");
const optimizationCommon = require('./optimization');
const pluginsCommon = require('./plugins');
const moduleCommon = require('./module');

module.exports = (env, dirname) => {
    return {
        entry: {
            index: path.resolve(dirname, './vue/index.js'),
        },
        output: {
            path: path.resolve(dirname, './dist/vue'),
        },
        plugins: [
            ...pluginsCommon(dirname),
            new VueLoaderPlugin()
        ],
        module: {
            rules: [
                ...moduleCommon().rules,
                {
                    test: /\.vue$/,
                    loader: "vue-loader",
                },
            ]

        },
        resolve: {
            extensions: ['.js', '.vue', '.css'],
        },
        optimization: optimizationCommon(),
    }
}