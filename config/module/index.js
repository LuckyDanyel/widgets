const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => {
    return {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(png|jpg|gif)/,
                type: 'asset/resource'
            }
         
        ]
    }
}