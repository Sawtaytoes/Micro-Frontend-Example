const webpack = require('webpack')
const WebpackDevServer = require("webpack-dev-server")
const { catchError, map, tap } = require('rxjs/operators')

const buildWebpackConfig = require('./utils/buildWebpackConfig')
const createWebpackConfigOptionsObservable = require('./utils/createWebpackConfigOptionsObservable')

const webpackDevServer$ = (
	createWebpackConfigOptionsObservable()
	.pipe(
		map(buildWebpackConfig),
		map((
			webpackConfig,
		) => ({
			webpackConfig,
			webpackDevServer: (
				new WebpackDevServer(
					(
						webpack(
							webpackConfig
						)
					),
					(
						webpackConfig
						.devServer
					),
				)
			),
		})),
		tap(({
			webpackConfig,
			webpackDevServer,
		}) => (
			webpackDevServer
			.listen(
				webpackConfig
				.devServer
				.port
			)
		)),
		catchError((
			error,
		) => {
			console.error(
				'Webpack dev server failed:',
				error,
			)

			process.exit()
		}),
	)
)

module.exports = webpackDevServer$
