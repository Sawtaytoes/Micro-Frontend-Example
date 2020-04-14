const axios = require('axios')
const config = require('config')
const cors = require('cors')
const express = require('express')
const fs = require('fs')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const { bindNodeCallback, EMPTY, from, of } = require('rxjs')
const { catchError, map, mapTo, mergeMap, pluck, retry, switchMap, tap, toArray } = require('rxjs/operators')

const createEntrypointRenderer = require('./utils/createEntrypointRenderer')
const routesList = require('../../config/utils/routesList')
const webpackClientConfig = require('./utils/webpackClientConfig')

const fsWriteFile$ = (
	bindNodeCallback(
		fs
		.writeFile
		.bind(fs)
	)
)

const httpServer$ = (
	of({
		devServerConfig: (
			webpackClientConfig
			.devServer
		),
		httpServer: express(),
		webpackCompiler: (
			webpack(
				webpackClientConfig
			)
		),
	})
	.pipe(
		tap(() => {
			createEntrypointRenderer
			.listenForEntrypoints()
		}),
		switchMap((
			props
		) => (
			from(routesList)
			.pipe(
				mergeMap(({
					assetsManifestLocation,
					bundleCacheFilename,
				}) => (
					from(
						axios(
							assetsManifestLocation
						)
					)
					.pipe(
						pluck(
							'data',
							'serverBundleLocation',
						),
						mergeMap((
							serverBundleLocation
						) => (
							from(
								axios(
									serverBundleLocation
								)
							)
							.pipe(
								pluck('data'),
								mergeMap((
									serverBundle,
								) => (
									fsWriteFile$(
										bundleCacheFilename,
										serverBundle,
										'utf-8',
									)
								)),
								catchError((
									error,
								) => {
									console.error(
										'Failed to save:',
										bundleCacheFilename,
										error,
									)

									process.exit()
								}),
							)
						)),
						retry(3),
						catchError(({
							error,
						}) => {
							console.error(
								"Failed to download:",
								assetsManifestLocation,
								error,
							)

							return EMPTY
						}),
					)
				)),
				toArray(),
				mapTo({
					...props,
					routesList,
				}),
			)
		)),
		map(({
			devServerConfig,
			httpServer,
			webpackCompiler,
		}) => (
			httpServer
			.use(cors())

			.use(
				webpackDevMiddleware(
					webpackCompiler,
					devServerConfig,
				)
			)

			.use(
				webpackHotMiddleware(
					webpackCompiler
				)
			)

			// .get(
			// 	config.get('testsPath'),
			// 	createEntrypointRenderer('tests.server')
			// )
			// .get(
			// 	`${config.get('testsPath')}/:testName`,
			// 	createEntrypointRenderer('tests.server')
			// )
			.get(
				'*',
				createEntrypointRenderer({
					filename: 'server.main.bundle',
				})
			)
		)),
		tap((
			httpServer
		) => {
			httpServer
			.listen(
				(
					config
					.get('frontendServerPort')
				),
				error => {
					error
					? console.error(error)
					: console.info('Listening for web requests...')
				}
			)
		}),
		catchError((
			error,
		) => {
			console.error(
				'Express server failed:',
				error,
			)

			process.exit()
		}),
	)
)

module.exports = httpServer$
