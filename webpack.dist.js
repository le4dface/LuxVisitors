'use strict';

// Modules
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var libraryName = 'lux.app';
var libraryNameMin = libraryName.concat('.min');
var entry = {};
var entryPath = __dirname + '/src/scripts/main.module.js';
entry[libraryName] = entryPath;
entry[libraryNameMin] = entryPath;

var config = {
    entry: entry,
    devtool: 'source-map',
    output: {
        path: __dirname + '/dist',
        filename: '[name].js',
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    /*
     * EXTERNALS
     * To prevent bundling of imported third party libraries.
     * Reference : https://webpack.js.org/configuration/externals/
     * */
    externals: {
    },
    module: {
        preLoaders: [
            {
                /**
                 *  ESLINT LOADER
                 *  Reference: https://github.com/MoOx/eslint-loader
                 */
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader"
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!less')
            },
            {
                test: /\.(png.*|jpg.*|jpeg.*|gif.*|svg.*|woff.*|woff2.*|ttf.*|eot.*)$/,
                loader: 'file'
            },
            {
                test: /\.html$/,
                loader: 'raw'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js']
    },
    plugins: [
        
        new ExtractTextPlugin(libraryName + '.css'),
        
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true,
            output: {
                comments:false
            }
        })
    ]
};


module.exports = config;
