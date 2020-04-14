import React, { Fragment } from 'react'
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
	microFrontendScriptsHtml,
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
							<Fragment>
								<MicroFrontendTargetIdForClient
									renderTargetId={
										microFrontendContextValue
										.renderTargetId
									}
								/>

								<ConfigAccessForClient
									windowConfig={__CONFIG__}
								/>
							</Fragment>
						),
						scripts: (
							<Fragment>
								<script
									defer
									src={
										'http://localhost'
										.concat(':')
										.concat(
											config
											.get('frontendServerPort')
										)
										.concat('/client.main.bundle.js')
									}
								/>

								{microFrontendScriptsHtml}
							</Fragment>
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
