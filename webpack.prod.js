const merge = require('webpack-merge')
const webpack = require('webpack');
const path = require('path');
const common = require('./webpack.common');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// 压缩js文件
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// 分离css文件
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(common, {
	entry: {
		index: './src/index.js',
		vendor: ['lodash']
	},

	output: {
		filename: '[name].[chunkhash].js',
		// chunkFilename: '[name].[chunkhash].js',
		path: path.resolve(__dirname, 'dist')
	},

	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',

			options: {
				presets: ['es2015'],
				plugins: ['syntax-dynamic-import', 'transform-async-to-generator']
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
		new webpack.HashedModuleIdsPlugin(),
		// CommonsChunkPlugin 的 'vendor' 实例，必须在 'runtime' 实例之前引入
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'runtime'
		}),
		new UglifyJSPlugin(),
		new ExtractTextPlugin('[name].[chunkhash].css'),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerHost: '127.0.0.1',
			analyzerPort: 2000,
			openAnalyzer: false
    })
	]
});