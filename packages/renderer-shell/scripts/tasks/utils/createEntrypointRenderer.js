const config = require('config')
const path = require('path')
const { catchError, map, mergeMap, tap } = require('rxjs/operators')
const { of, Subject } = require('rxjs')

const renderEntrypoint$ = new Subject()

const listenForEntrypoints = () => {
	const __CONFIG__ = (
		JSON.stringify(
			config
		)
	)

	renderEntrypoint$
	.pipe(
		tap(({
			filePath,
		}) => {
			config.get('isLocalDevelopment')
			&& (
				delete (
					require.cache[
						require.resolve(
							filePath
						)
					]
				)
			)
		}),
		mergeMap(({
			filePath,
			options = {},
			request,
			response,
		}) => (
			of(null)
			.pipe(
				map(() => (
					require(filePath)
					.default
				)),
				map((
					serverEntrypoint,
				) => {
					const route = (
						options
						.routesListConfig
						.find(({
							rootPath,
						}) => (
							request
							.url
							.match(new RegExp(`^${rootPath}.*$`))
						))
					)

					const microFrontend = () => (
						require(route.bundleCacheFilename)
						.default({
							__CONFIG__,
							config,
							request,
							response,
						})
					)

					return {
						microFrontendContextValue: {
							hasMicroFrontend: Boolean(route),
							microFrontend,
							renderTargetId: (
								route
								&& route.renderTargetId
							),
						},
						serverEntrypoint,
					}
				}),
				map(({
					microFrontendContextValue,
					serverEntrypoint,
				}) => (
					serverEntrypoint({
						__CONFIG__,
						config,
						microFrontendContextValue,
						request,
						response,
					})
				)),
				catchError((
					error,
				) => {
					response.send(error)

					console.error(error)
				}),
			)
		)),
	)
	.subscribe()
}

const createEntrypointRenderer = ({
	filename,
	options,
}) => {
	const filePath = (
		path.join(
			config.get('outputPath'),
			filename,
		)
	)

	return (
		request,
		response,
	) => {
		renderEntrypoint$
		.next({
			filePath,
			options,
			request,
			response,
		})
	}
}

createEntrypointRenderer
.listenForEntrypoints = listenForEntrypoints

module.exports = createEntrypointRenderer
