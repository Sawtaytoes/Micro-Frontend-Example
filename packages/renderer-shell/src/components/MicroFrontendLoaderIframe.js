import axios from 'axios'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useRef, useState } from 'react'

const propTypes = {
	indexHtmlLocation: PropTypes.string.isRequired,
	microFrontendIdentifier: PropTypes.string.isRequired,
}

const MicroFrontendLoaderIframe = ({
	indexHtmlLocation,
	microFrontendIdentifier,
}) => {
	const iframeRef = useRef()
	const [iframeContents, setIframeContents] = useState(null)
	const [iframeHeight, setIframeHeight] = useState(0)

	useEffect(() => {
		axios(indexHtmlLocation)
		.then(response => (
			response
			.text()
		))
		.then(setIframeContents)
	}, [indexHtmlLocation])

	const onIframeHeightChanged = (
		useCallback(() => {
			window.requestAnimationFrame(() => {
				setIframeHeight(
					iframeRef
					.current
					.contentDocument
					.body
					.clientHeight
				)
			})
		}, [iframeRef])
	)

	useEffect(() => {
		window
		.addEventListener(
			'resize',
			onIframeHeightChanged,
		)

		return () => {
			window
			.removeEventListener(
				'resize',
				onIframeHeightChanged,
			)
		}
	}, [onIframeHeightChanged])

	return (
		<iframe
			id={microFrontendIdentifier}
			onLoad={onIframeHeightChanged}
			ref={iframeRef}
			srcDoc={iframeContents}
			style={{
				border: 'none',
				display: 'block',
				height: (
					iframeHeight
					? `${iframeHeight}px`
					: '100%'
				),
				width: '100%',
			}}
			title={microFrontendIdentifier}
		/>
	)
}

MicroFrontendLoaderIframe.propTypes = propTypes

export default MicroFrontendLoaderIframe
