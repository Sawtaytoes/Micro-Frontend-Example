import React from 'react'
import ReactDOM from 'react-dom'

import App from '../components/App'
import ClientRoot from '../components/ClientRoot'

const rootElement = (
	document
	.getElementById(
		window
		.config
		.get('reactRenderTarget')
	)
)

const reactRoot = (
	<ClientRoot>
		<App />
	</ClientRoot>
)

ReactDOM.hydrate(
	reactRoot,
	rootElement,
)
