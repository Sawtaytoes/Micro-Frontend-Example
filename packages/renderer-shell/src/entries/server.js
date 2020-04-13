import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import ConfigAccessForClient from '../components/ConfigAccessForClient'
import Html from '../components/Html'
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
					}}
				>
					<ReactRenderTarget
						renderTargetId={
							config
							.get('reactRenderTarget')
						}
					>
						<ServerRoot
							context={context}
							location={request.url}
						/>
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
		.send(
			htmlString
		)
	)
}

export default server
