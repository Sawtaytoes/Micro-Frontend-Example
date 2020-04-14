import React from 'react'
import ReactDOM from 'react-dom'

import ClientRoot from '../components/ClientRoot'
import MicroFrontend1App from '../components/MicroFrontend1App'

const reactRoot = (
	<ClientRoot>
		<MicroFrontend1App />
	</ClientRoot>
)

const rootElement = (
	document
	.getElementById(
		window
		.config
		.get('microFrontend1ReactRenderTargetId')
	)
)

ReactDOM.hydrate(

const reactDomRender = (
	rootElement.innerHTML
	? ReactDOM.hydrate
	: ReactDOM.render
)

reactDomRender(
	reactRoot,
	rootElement,
)
