import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import App from '../components/App'
import ConfigAccessForClient from '../components/ConfigAccessForClient'
import Html from '../components/Html'
import MicroFrontendContext from '../components/MicroFrontendContext'
import ReactRenderTarget from '../components/ReactRenderTarget'
import ServerRoot from '../components/ServerRoot'

const server = ({
	__CONFIG__,
	config,
	microFrontend,
	request,
	response,
}) => {
	const context = {}

	const htmlString = (
		'<!DOCTYPE html>'
		.concat(
			renderToStaticMarkup(
				<Html
					htmlComponents={{
						body: (
							<ConfigAccessForClient
								windowConfig={__CONFIG__}
							/>
						),
						scripts: (
							<script
								defer
								src={
									'//localhost'
									.concat(`:${
										config
										.get('frontendServerPort')
									}`)
									.concat('/client.main.bundle.js')
								}
							/>
						),
					}}
				>
					<ReactRenderTarget
						renderTargetId={
							config
							.get('reactRenderTarget')
						}
					>
						<MicroFrontendContext.Provider
							value={microFrontend}
						>
							<ServerRoot
								config={config}
								context={context}
								location={request.url}
							>
								<App />
							</ServerRoot>
						</MicroFrontendContext.Provider>
					</ReactRenderTarget>
				</Html>
			)
		)
	)

	context.url
	? (
		response
		.redirect(
			301,
			context.url,
		)
	)
	: (
		response
		.send(htmlString)
	)
}

export default server
