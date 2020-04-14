import axios from 'axios'
import PropTypes from 'prop-types'
import React, { useContext, useEffect, useState } from 'react'

import MicroFrontendContext from './MicroFrontendContext'
import ReactRenderTarget from './ReactRenderTarget'

const propTypes = {
	assetsManifestLocation: PropTypes.string.isRequired,
}

const MicroFrontendLoader = ({
	assetsManifestLocation,
}) => {
	const {
		hasMicroFrontend,
		renderMicroFrontend,
		renderTargetId: contextRenderTargetId,
	} = useContext(MicroFrontendContext) || {}

	const [
		renderTargetId,
		setRenderTargetId,
	] = useState(
		contextRenderTargetId
		|| window.__MICRO_FRONTEND_TARGET_ID__
		|| ''
	)

	// const [
	// 	linkHrefs,
	// 	setLinkHrefs,
	// ] = useState([])

	const [
		scriptSrcs,
		setScriptSrcs,
	] = useState([])

	useEffect(() => {
		return () => {
			if (!window.__MICRO_FRONTEND_TARGET_ID__) {
				return
			}

			const scriptElement = (
				document.getElementById(
					window.__MICRO_FRONTEND_TARGET_ID__
					.concat('-script')
				)
			)

			scriptElement
			.parentNode
			.removeChild(scriptElement)

			delete window.__MICRO_FRONTEND_TARGET_ID__
		}
	}, [])

	useEffect(() => {
		if (window.__MICRO_FRONTEND_TARGET_ID__) {
			return
		}

		axios(assetsManifestLocation)
		.then(response => (
			response
			.data
		))
		.then(({
			// linkLocations = [],
			renderTargetId = '',
			scriptLocations = [],
		}) => {
			setRenderTargetId(
				renderTargetId
			)

			// setLinkHrefs(
			// 	linkLocations
			// )

			setScriptSrcs(
				scriptLocations
			)
		})
	}, [assetsManifestLocation])

	useEffect(() => {
		if (window.__MICRO_FRONTEND_TARGET_ID__) {
			return
		}

		const scriptElements = (
			scriptSrcs
			.map(scriptSrc => {
				const scriptElement = (
					document
					.createElement('script')
				)

				scriptElement
				.async = true

				scriptElement
				.src = scriptSrc

				document
				.body
				.appendChild(scriptElement)

				return scriptElement
			})
		)

		return () => {
			scriptElements
			.forEach(scriptElement => {
				document
				.body
				.removeChild(scriptElement)
			})
		}
	}, [
		renderTargetId,
		scriptSrcs,
	])

	return (
		hasMicroFrontend
		? (
			<ReactRenderTarget renderTargetId={renderTargetId}>
				{renderMicroFrontend()}
			</ReactRenderTarget>
		)
		: (
			<ReactRenderTarget
				hasString
				renderTargetId={renderTargetId}
			>
				{
					(
						document
						.getElementById(
							renderTargetId
						)
						|| {}
					)
					.innerHTML
					|| ''
				}
			</ReactRenderTarget>
		)
		// : (
		// 	<div id={`${renderTargetId}-loader`}>
		// 		<div id={renderTargetId} />

		// 		{
		// 			linkHrefs
		// 			.map(linkHref => (
		// 				<link
		// 					href={`/${renderTargetId}/${linkHref}`}
		// 					key={linkHref}
		// 					rel="stylesheet"
		// 				/>
		// 			))
		// 		}
		// 	</div>
		// )
	)
}

MicroFrontendLoader.propTypes = propTypes

export default MicroFrontendLoader
