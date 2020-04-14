import React from 'react'
import ReactDOM from 'react-dom'

import ClientRoot from '../components/ClientRoot'
import MicroFrontend1App from '../components/MicroFrontend1App'

const rootElement = (
	document
	.getElementById(
		window
		.config
		.get('microFrontend1ReactRenderTarget')
	)
)

const reactRoot = (
	<ClientRoot>
		<MicroFrontend1App />
	</ClientRoot>
)

ReactDOM.hydrate(
	reactRoot,
	rootElement,
)
