import PropTypes from 'prop-types'
import React from 'react'

import App from '../components/App'

const propTypes = {
	htmlComponents: (
		PropTypes.shape({
			htmlProps: PropTypes.object,
			head: PropTypes.node,
			scripts: PropTypes.node,
			body: PropTypes.node,
		})
	),
}

const Html = ({
	htmlComponents = {},
}) => (
	<html
		{...htmlComponents.htmlProps}
		lang="en"
	>
		<head>
			<title>Renderer Shell</title>

			{htmlComponents.head}
		</head>
		<body>
			<div id="renderer-shell">
				<App />
			</div>

			<script
				defer
				src={
					`//localhost:${global.frontendServerPort}`
					.concat('/client.bundle.js')
				}
			/>

			{htmlComponents.scripts}
			{htmlComponents.body}
		</body>
	</html>
)

Html.propTypes = propTypes

export default Html
