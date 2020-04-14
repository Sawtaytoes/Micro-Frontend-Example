import axios from 'axios'
import PropTypes from 'prop-types'
import React, { useContext, useEffect, useRef, useState } from 'react'

import MicroFrontendContext from './MicroFrontendContext'
import ReactRenderTarget from './ReactRenderTarget'

const propTypes = {
	assetsManifestLocation: PropTypes.string.isRequired,
}

const MicroFrontendLoader = ({
	assetsManifestLocation,
}) => {
	const ref = useRef()

	const {
		hasMicroFrontend,
		microFrontend,
		renderTargetId: contextRenderTargetId,
	} = useContext(MicroFrontendContext) || {}

	const [
		renderTargetId,
		setRenderTargetId,
	] = useState(contextRenderTargetId || '')

	// const [
	// 	linkHrefs,
	// 	setLinkHrefs,
	// ] = useState([])

	const [
		scriptSrcs,
		setScriptSrcs,
	] = useState([])

	useEffect(() => {
		if (ref.current) {
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
		if (ref.current) {
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
				{microFrontend()}
			</ReactRenderTarget>
		)
		: (
			<div
				id={
					renderTargetId
					|| window.__MICRO_FRONTEND_TARGET_ID__
				}
			/>
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
