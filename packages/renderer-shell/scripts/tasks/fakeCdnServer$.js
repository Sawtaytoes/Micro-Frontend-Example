const cors = require('cors')
const config = require('config')
const express = require('express')
const { catchError, tap } = require('rxjs/operators')
const { of } = require('rxjs')

const frontendServerPort = config.get('frontendServerPort')
const fakeCdnServerPort = config.get('fakeCdnServerPort')

const microFrontend1JsonResponse = {
	renderTargetId: (
		config
		.get('microFrontend1ReactRenderTargetId')
	),
	scriptLocations: [
		`http://localhost:${frontendServerPort}/client.microFrontend1.bundle.js`,
	],
	serverBundleLocation: `http://localhost:${fakeCdnServerPort}/server.microFrontend1.bundle.js`,
}

const fakeCdnServer$ = (
	of(express())
	.pipe(
		tap((
			httpServer,
		) => {
			httpServer
			.use(cors())

			.use(
				express
				.static(
					config.get('outputPath'),
					{ redirect: false }
				)
			)

			.get(
				'/microfrontend1',
				(request, response) => {
					response.send(
						JSON.stringify(
							microFrontend1JsonResponse
						)
					)
				}
			)
			.get(
				'*',
				(request, response) => {
					response.send('I CAN HAS FAKE CDN!')
				}
			)

			httpServer
			.listen(
				fakeCdnServerPort,
				error => {
					error
					? console.error(error)
					: console.info('Listening for CDN requests...')
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

module.exports = fakeCdnServer$
