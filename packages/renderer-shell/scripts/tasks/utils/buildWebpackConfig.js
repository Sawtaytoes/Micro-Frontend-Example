const BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin')
// const CleanWebpackPlugin = require('clean-webpack-plugin')
const os = require('os')
const webpack = require('webpack')

const urlLoaderExtensions = (
	[
		'eot',
		'gif',
		'jpeg',
		'jpg',
		'otf',
		'png',
		'svg',
		'ttf',
		'woff',
		'woff2',
	]
	.join('|')
)

const buildWebpackConfig = ({
	frontendServerPort,
	isLocalDevelopment,
	nodeEnvironment,
	outputPath,
	webpackDevServerPort,
}) => ({
	cache: true,
	devtool: (
		isLocalDevelopment
		&& 'eval-source-map'
	),
	devServer: {
		contentBase: outputPath,
		disableHostCheck: true,
		hot: true,
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
		host: (
			os
			.hostname()
		),
		port: webpackDevServerPort,
		proxy: {
			'*': {
				target: `http://localhost:${frontendServerPort}`,
			},
		},
		stats: 'minimal',
	},
	entry: {
		'frontend.client': (
			isLocalDevelopment
			? [
				`webpack-dev-server/client?http://localhost:${webpackDevServerPort}`,
				'webpack/hot/only-dev-server',
				'react-hot-loader/patch',
				'./src/entries/client.js',
			]
			: './src/entries/client.js'
		),
		'frontend.server': './src/entries/server.js',
	},
	mode: nodeEnvironment,
	module: {
		rules: [
			{
				exclude: /node_modules/,
				test: /\.js$/,
				use: (
					isLocalDevelopment
					? [
						'babel-loader?cacheDirectory=true',
						'eslint-loader?fix=true',
					]
					: ['babel-loader?cacheDirectory=true']
				),
			},
			{
				exclude: /node_modules/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: '[name].[ext]',
				},
				test: (
					new RegExp(
						`.(${urlLoaderExtensions})$`
					)
				),
			},
		],
	},
	optimization: {
		concatenateModules: true,
		minimize: !isLocalDevelopment,
		namedModules: true,
		noEmitOnErrors: true,
	},
	output: {
		filename: '[name].server.js',
		libraryTarget: 'commonjs2',
		path: outputPath,
		pathinfo: isLocalDevelopment,
		publicPath: '/',
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
			new BellOnBundlerErrorPlugin(),
			new webpack.DefinePlugin(
				[
					{
						key: 'process.env.NODE_ENV',
						value: nodeEnvironment,
					},
				]
				.reduce(
					(
						combined,
						{
							key,
							value,
						}
					) => ({
						...combined,
						[key]: (
							JSON
							.stringify(value)
						),
					}),
					{},
				)
			),
			new webpack.LoaderOptionsPlugin({
				minimize: !isLocalDevelopment,
			}),
			// new CleanWebpackPlugin({
			// 	cleanStaleWebpackAssets: false,
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
	watch: isLocalDevelopment,
	watchOptions: {
		ignored: [
			outputPath,
			'./node_modules/',
			'./scripts/',
		],
	},
})

module.exports = buildWebpackConfig
