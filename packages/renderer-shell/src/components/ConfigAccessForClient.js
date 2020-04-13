import PropTypes from 'prop-types'
import React from 'react'

const propTypes = {
	windowConfig: PropTypes.string,
}

const ConfigAccessForClient = ({
	windowConfig,
}) => (
	<script
		dangerouslySetInnerHTML={{
			__html: `
window.__CONFIG__ = ${windowConfig}

window.config = {
	get: configKey => (
		window.__CONFIG__[configKey]
	),
	has: configKey => (
		window.config.get(configKey) !== undefined
	),
}
			`,
		}}
	/>
)

ConfigAccessForClient.propTypes = propTypes

export default ConfigAccessForClient
