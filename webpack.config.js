'use strict';
let webpack = require('webpack');
let path = require('path');
let miniCssExtractPlugin = require("mini-css-extract-plugin");

let mode = "development";

console.log(path.join(__dirname, '/src/index.js'))

let config = {
    mode: mode,
    entry: {
        index: path.join(__dirname, '/src/index.js')
    },
    output: {
        filename: "[name].bundle.js",
        path: path.join(__dirname, '/dist')
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new miniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        }, {
            test: /\.(sa|sc|c)ss$/,
            use: [
                miniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
                'sass-loader'
            ]
        },
        {
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name]-[hash:5].[ext]'
                }
            }]
        }]
    },
    devServer: {
        contentBase: path.join(__dirname, '/dist'),
        port: '3001',
        inline: true,//实时刷新
        hot: true
    }
};

module.exports = config;