import PropTypes from 'prop-types'
import React from 'react'

const propTypes = {
	renderTargetId: PropTypes.string,
}

const MicroFrontendTargetIdForClient = ({
	renderTargetId,
}) => (
	<script
		dangerouslySetInnerHTML={{
			__html: `
window.__MICRO FRONTEND_TARGET_ID = ${renderTargetId}
			`,
		}}
	/>
)

MicroFrontendTargetIdForClient.propTypes = propTypes

export default MicroFrontendTargetIdForClient
