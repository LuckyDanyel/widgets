const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = (dirname) => 
    [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template:  path.join(dirname, './index.html'),
            filename: `index1.html`,
        }),
    ]
