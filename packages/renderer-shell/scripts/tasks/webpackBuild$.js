const webpack = require('webpack')
const { bindNodeCallback, EMPTY } = require('rxjs')
const { catchError, filter, map, switchMap, tap } = require('rxjs/operators')

const buildWebpackConfig = require('./utils/buildWebpackConfig')
const createWebpackConfigOptionsObservable = require('./utils/createWebpackConfigOptionsObservable')

const webpackBuild$ = (
	createWebpackConfigOptionsObservable()
	.pipe(
		map(buildWebpackConfig),
		switchMap((
			webpackConfig,
		) => (
			bindNodeCallback(
				webpack
			)(
				webpackConfig
			)
		)),
		filter(Boolean),
		tap((
			stats,
		) => {
			console.info(
				stats
				.toString({ colors: true })
			)
		}),
		catchError((
			error,
		) => {
			console.error(
				'Webpack build failed:',
				error,
			)

			return EMPTY
		}),
		catchError(error => {
			console.error(
				'Webpack build failed:',
				error,
			)

			process.exit()
		}),
	)
)

module.exports = webpackBuild$
