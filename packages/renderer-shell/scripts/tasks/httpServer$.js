const config = require('config')
const cors = require('cors')
const express = require('express')
const { catchError, map, tap } = require('rxjs/operators')
const { of } = require('rxjs')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const createEntrypointRenderer = require('./utils/createEntrypointRenderer')
const webpackClientConfig = require('./utils/webpackClientConfig')

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
		map(({
			devServerConfig,
			httpServer,
			webpackCompiler,
		}) => (
			httpServer
			.use(cors())

			.use(
				express
				.static(
					config.get('outputPath'),
					{ redirect: false }
				)
			)

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
				createEntrypointRenderer('server.bundle')
			)
		)),
		tap((
			httpServer
		) => {
			httpServer
			.listen(
				config
				.get('frontendServerPort'),
				(error) => {
					error
					? console.error(error)
					: console.log('Listening for web requests...')
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
