import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import App from '../components/App'
import ConfigAccessForClient from '../components/ConfigAccessForClient'
import Html from '../components/Html'
import MicroFrontendContext from '../components/MicroFrontendContext'
import MicroFrontendTargetIdForClient from '../components/MicroFrontendTargetIdForClient'
import ReactRenderTarget from '../components/ReactRenderTarget'
import ServerRoot from '../components/ServerRoot'

const server = ({
	__CONFIG__,
	config,
	microFrontendContextValue,
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
							<React.Fragment>
								<MicroFrontendTargetIdForClient
									renderTargetId={
										microFrontendContextValue
										.renderTargetId
									}
								/>

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
							</React.Fragment>
						),
					}}
				>
					<ReactRenderTarget
						renderTargetId={
							config
							.get('reactRenderTargetId')
						}
					>
						<MicroFrontendContext.Provider
							value={microFrontendContextValue}
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
