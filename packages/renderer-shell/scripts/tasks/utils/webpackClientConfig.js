const webpackClientConfig = {
	mode: 'development',
	entry: 'src/entrypoints/client.js',
	output: {
		filename: '[name].[chunkhash:8].js',
		path: __dirname+'/build',
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: 'eslint-loader',
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'env',
							'react',
						],
					},
				},
			},
		],
	},
}

module.exports = webpackClientConfig
