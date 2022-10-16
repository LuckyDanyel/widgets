const path = require('path');
const { VueLoaderPlugin } = require("vue-loader");

module.exports = (env, dirname) => {
    return {
        entry: {
            index: path.resolve(dirname, './vue/index.js'),
        },
        output: {
            path: path.resolve(dirname, './dist/vue'),
        },
        plugins: [
            new VueLoaderPlugin()
        ],
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: "vue-loader",
                },
            ]

        },
        resolve: {
            extensions: ['.js', '.vue', '.css'],
        },
    }
}