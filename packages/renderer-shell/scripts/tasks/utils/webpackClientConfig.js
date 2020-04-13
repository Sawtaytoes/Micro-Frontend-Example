// const BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin')
const config = require('config')
const os = require('os')
const webpack = require('webpack')
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const getAbsolutePath = require('../../../config/utils/getAbsolutePath')

// const frontendServerPort = config.get('frontendServerPort')
const isLocalDevelopment = config.get('isLocalDevelopment')
const nodeEnvironment = config.get('nodeEnvironment')
const outputPath = config.get('outputPath')
// const webpackDevServerPort = config.get('webpackDevServerPort')

const webpackClientConfig = {
	devServer: {
		contentBase: outputPath,
		hot: true,
		publicPath: '/',
	},
	devtool: (
		isLocalDevelopment
		&& 'eval-source-map'
	),
	entry: (
		isLocalDevelopment
		? [
			`webpack-hot-middleware/client`,
			'react-hot-loader/patch',
			getAbsolutePath('./src/entries/client.js'),
		]
		: getAbsolutePath('./src/entries/client.js')
	),
	mode: nodeEnvironment,
	module: {
		rules: [
			{
				enforce: 'pre',
				exclude: /node_modules/,
				test: /\.(js|jsx)$/,
				use: {
					loader: 'eslint-loader',
					options: {
						fix: true,
					},
				},
			},
			{
				exclude: /node_modules/,
				test: /\.(js|jsx)$/,
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true,
					},
				},
			},
		],
	},
	output: {
		filename: (
			isLocalDevelopment
			? 'client.bundle.js'
			: 'client.[chunkhash:8].js'
		),
		path: outputPath,
	},
	parallelism: (
		os
		.cpus()
		.length
	),
	plugins: (
		(
			isLocalDevelopment
			? [new webpack.HotModuleReplacementPlugin()]
			: []
		)
		.concat([
			new webpack.ProgressPlugin(),
			// new BellOnBundlerErrorPlugin(),
			new WebpackBuildNotifierPlugin({
				suppressSuccess: 'always',
				title: 'Renderer Shell',
			}),
			// new CleanWebpackPlugin({
			// 	// cleanStaleWebpackAssets: false,
			// }),
		])
	),
	resolve: {
		alias: {
			'react-dom': (
				isLocalDevelopment
				? '@hot-loader/react-dom'
				: 'react-dom'
			),
		},
		extensions: ['.js'],
	},
	stats: {
		colors: true,
		preset: 'errors-warnings',
	},
	watch: isLocalDevelopment,
	watchOptions: {
		ignored: [
			outputPath,
			'./node_modules/',
			'./scripts/',
		],
	},
}

module.exports = webpackClientConfig
