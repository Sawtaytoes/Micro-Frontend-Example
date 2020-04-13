import PropTypes from 'prop-types'
import React from 'react'

const propTypes = {
	children: PropTypes.node.isRequired,
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
	children,
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
			{children}

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
