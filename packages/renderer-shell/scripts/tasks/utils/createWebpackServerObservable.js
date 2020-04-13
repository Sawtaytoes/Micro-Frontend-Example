const webpack = require('webpack')
const WebpackDevServer = require("webpack-dev-server")
const { EMPTY, of } = require('rxjs')
const { catchError, map, tap } = require('rxjs/operators')

const createWebpackBuilderObservable = (
	webpackConfig,
) => (
	of(null)
	.pipe(
		map(() => (
			webpack(
				webpackConfig,
			)
		)),
		map((
			webpackCompiler,
		) => (
			new WebpackDevServer(
				webpackCompiler,
				(
					webpackConfig
					.devServer
				),
			)
		)),
		tap((
			webpackDevServer,
		) => (
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
				'Webpack build failed:',
				error,
			)

			return EMPTY
		})
	)
)

module.exports = createWebpackBuilderObservable
