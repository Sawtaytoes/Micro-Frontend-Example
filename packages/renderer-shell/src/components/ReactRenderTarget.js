import PropTypes from 'prop-types'
import React from 'react'
import { renderToString } from 'react-dom/server'

const propTypes = {
	children: PropTypes.node.isRequired,
	renderTargetId: PropTypes.string.isRequired,
}

const ReactRenderTarget = ({
	children,
	renderTargetId,
}) => (
	<div
		dangerouslySetInnerHTML={{
			__html: renderToString(children),
		}}
		id={renderTargetId}
	/>
)

ReactRenderTarget.propTypes = propTypes

export default ReactRenderTarget
