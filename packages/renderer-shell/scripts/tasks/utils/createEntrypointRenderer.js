const config = require('config')
const path = require('path')
const { catchError, map, mergeMap, tap } = require('rxjs/operators')
const { of, Subject } = require('rxjs')

const renderEntrypoint$ = new Subject()

const listenForEntrypoints = () => (
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
				) => (
					serverEntrypoint({
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
)

const createEntrypointRenderer = (
	filename,
) => {
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
			request,
			response,
		})
	}
}

createEntrypointRenderer
.listenForEntrypoints = listenForEntrypoints

module.exports = createEntrypointRenderer
