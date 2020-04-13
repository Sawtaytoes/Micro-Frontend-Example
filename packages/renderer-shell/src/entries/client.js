import React from 'react'
import ReactDOM from 'react-dom'

const App = () => (
	<div>kevin</div>
)

const rootElement = (
	document
	.getElementById('renderer-shell')
)

ReactDOM.hydrate(
	<App />,
	rootElement,
)
