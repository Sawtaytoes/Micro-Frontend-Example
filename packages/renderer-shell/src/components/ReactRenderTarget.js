import PropTypes from 'prop-types'
import React from 'react'
import { renderToString } from 'react-dom/server'

const propTypes = {
	children: PropTypes.node.isRequired,
	hasString: PropTypes.bool,
	renderTargetId: PropTypes.string.isRequired,
}

const ReactRenderTarget = ({
	children,
	hasString,
	renderTargetId,
}) => (
	hasString
	? (
		<div
			dangerouslySetInnerHTML={{
				__html: children,
			}}
			id={renderTargetId}
			// suppressHydrationWarning
		/>
	)
	: (
		<div
			dangerouslySetInnerHTML={{
				__html: renderToString(children),
			}}
			id={renderTargetId}
			// suppressHydrationWarning
		/>
	)
)

ReactRenderTarget.propTypes = propTypes

export default ReactRenderTarget
