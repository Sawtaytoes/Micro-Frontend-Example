import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import ConfigAccessForClient from '../components/ConfigAccessForClient'
import MicroFrontend1App from '../components/MicroFrontend1App'
import ReactRenderTarget from '../components/ReactRenderTarget'
import ServerRoot from '../components/ServerRoot'

const server = ({
	__CONFIG__,
	config,
	request,
	response,
}) => {
	const context = {}

	const htmlString = (
		renderToStaticMarkup(
			<ReactRenderTarget
				renderTargetId={
					config
					.get('microFrontend1ReactRenderTarget')
				}
			>
				<ConfigAccessForClient
					windowConfig={__CONFIG__}
				/>

				<script
					defer
					src={
						'//localhost'
						.concat(`:${
							config
							.get('frontendServerPort')
						}`)
						.concat('/client.microFrontend1.bundle.js')
					}
				/>

				<ServerRoot
					config={config}
					context={context}
					location={request.url}
				>
					<MicroFrontend1App />
				</ServerRoot>
			</ReactRenderTarget>
		)
	)

	return htmlString

	// context.url
	// ? (
	// 	response
	// 	.redirect(
	// 		301,
	// 		context.url,
	// 	)
	// )
	// : (
	// 	response
	// 	.send(htmlString)
	// )
}

export default server
