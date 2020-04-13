import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import App from '../components/App'

const html = `
	<!DOCTYPE html>
	<html>
		<head>
			<title>Renderer Shell</title>
		</head>
		<body>
			<div id="renderer-shell">${renderToStaticMarkup(<App />)}</div>
			<script src="//localhost:${global.frontendServerPort}/client.bundle.js"></script>
		</body>
	</html>
`

const server = ({
	// request,
	response,
}) => (
	response
	.send(
		html
	)
)

export default server
