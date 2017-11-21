const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: {
    polyfill: './src/polyfill.js',
    index: './src/index.js'
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  module:{
    rules:[
      {
        test: require.resolve('./src/global.js'),
        use: 'exports-loader?file,helper'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',

        options: {
          plugins: ['transform-runtime'],
          presets: ['es2015']
        }
      },
      
      
      
      
      {
        test: /\.jade$/,
        loader: 'pug-loader'
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './src/index.tmpl.jade'
    }),
    new webpack.ProvidePlugin({
      join: ['lodash', 'join']
    })
  ]
}