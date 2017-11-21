const merge = require('webpack-merge')
const webpack = require('webpack');
const path = require('path');
const common = require('./webpack.common');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

// 压缩js文件
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// 分离css文件
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(common, {
	entry: {
		index: './src/index.js'
	},

	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',

			options: {
				plugins: ['transform-runtime', 'transform-es3-member-expression-literals', 'lodash'],
				presets: ['es2015']
			}
		},
		{
			test: /\.(png|svg|jpeg|jpg|gif)$/,
			loader: 'file-loader',
			options: {
				name: '[name].[hash].[ext]',
				outputPath: 'images/'
			}
		},
		{
			test: /\.jade$/,
			loader: 'pug-loader'
		},
		{
			test: /\.(ttf|woff|woff2|eot|otf)$/,
			loader: 'file-loader',
			options: {
				name: '[name].[hash].[ext]',
				outputPath: 'fonts/'
			}
		},
		{
			test: /\.(scss|css)$/,

			use: ExtractTextPlugin.extract({
				use: [{
					loader: 'css-loader',
					options: {
						sourceMap: true
					}
				},
				{
					loader: 'sass-loader',
					options: {
						sourceMap: true
					}
				}
				],
				fallback: 'style-loader'
			})
		}
		]
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new LodashModuleReplacementPlugin(),
		// new UglifyJSPlugin(),
		new ExtractTextPlugin('style.css')
	]
});