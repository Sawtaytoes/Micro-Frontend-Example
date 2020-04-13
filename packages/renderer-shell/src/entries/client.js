import React from 'react'
import ReactDOM from 'react-dom'

import ClientRoot from '../components/ClientRoot'

const rootElement = (
	document
	.getElementById(
		window
		.config
		.get('reactRenderTarget')
	)
)

ReactDOM.hydrate(
	<ClientRoot />,
	rootElement,
)
