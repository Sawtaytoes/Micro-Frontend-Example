import React from 'react'
// import { renderToStaticMarkup } from 'react-dom/server'

// import ConfigAccessForClient from '../components/ConfigAccessForClient'
import MicroFrontend1App from '../components/MicroFrontend1App'
import ServerRoot from '../components/ServerRoot'

const microFrontend1Server = ({
	// __CONFIG__,
	config,
	request,
	// response,
}) => ({
	renderMicroFrontend: () => {
		const context = {}

		const microFrontend = (
			<ServerRoot
				config={config}
				context={context}
				location={request.url}
			>
				<MicroFrontend1App />
			</ServerRoot>
		)

		return microFrontend
	},
	scriptsHtml: (
		<script
			defer
			id={
				config
				.get('microFrontend1ReactRenderTargetId')
				.concat('-script')
			}
			src={
				'http://localhost'
				.concat(':')
				.concat(
					config
					.get('frontendServerPort')
				)
				.concat('/client.microFrontend1.bundle.js')
			}
		/>
	)
})

	// TODO: Figure this out like passing Renderer-Shell's context so if we need to redirect here, we do.

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

export default microFrontend1Server
