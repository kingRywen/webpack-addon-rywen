const merge = require('webpack-merge')
const webpack = require('webpack');
const path = require('path');
const common = require('./webpack.common');

// 压缩js文件
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// 分离css文件
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(common, {
	entry: {
		index: './src/index.js',
		another: './src/another_module.js'
	},

	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',

			options: {
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
		new UglifyJSPlugin(),
		new ExtractTextPlugin('style.css'),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		// 移除公用重复的模块
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common' // 指定公用模块的名字
		})
	]
});