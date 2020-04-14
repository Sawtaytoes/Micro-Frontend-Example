import axios from 'axios'
import PropTypes from 'prop-types'
import React, { useContext, useEffect, useState } from 'react'

import MicroFrontendContext from './MicroFrontendContext'

const propTypes = {
	assetsManifestLocation: PropTypes.string.isRequired,
}

const MicroFrontendLoader = ({
	assetsManifestLocation,
}) => {
	const microFrontend = useContext(MicroFrontendContext)

	const [
		isDoneLoading,
		setIsDoneLoading,
	] = useState(false)

	const [
		renderTarget,
		setRenderTarget,
	] = useState('')

	const [
		linkHrefs,
		setLinkHrefs,
	] = useState([])

	const [
		scriptSrcs,
		setScriptSrcs,
	] = useState([])

	useEffect(() => {
		axios(assetsManifestLocation)
		.then(response => (
			response
			.data
		))
		.then(({
			linkLocations = [],
			renderTarget = '',
			scriptLocations = [],
		}) => {
			setRenderTarget(
				renderTarget
			)

			setLinkHrefs(
				linkLocations
			)

			setScriptSrcs(
				scriptLocations
			)
		})
	}, [assetsManifestLocation])

	useEffect(() => {
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

		setIsDoneLoading(true)

		return () => {
			scriptElements
			.forEach(scriptElement => {
				document
				.body
				.removeChild(scriptElement)
			})
		}
	}, [
		renderTarget,
		scriptSrcs,
	])

	return (
		microFrontend
		? (
			<div
				dangerouslySetInnerHTML={{
					__html: microFrontend(),
				}}
			/>
		)
		: (
			isDoneLoading
			? (
				<div>
					<div id={renderTarget} />
					{/*
					<div id={`${renderTarget}-loader`}>
						<div id={renderTarget} />

						{
							linkHrefs
							.map(linkHref => (
								<link
									href={`/${renderTarget}/${linkHref}`}
									key={linkHref}
									rel="stylesheet"
								/>
							))
						}
					</div>
					*/}
				</div>
			)
			: null
		)
	)
}

MicroFrontendLoader.propTypes = propTypes

export default MicroFrontendLoader
