import React from 'react'
import ReactDOM from 'react-dom'

import App from '../components/App'

const rootElement = (
	document
	.getElementById('renderer-shell')
)

ReactDOM.hydrate(
	<App />,
	rootElement,
)
