import axios from 'axios'
import React, { useEffect, useState } from 'react'

const MicroFrontendLoader = ({
	assetManifestLocation,
	microFrontendIdentifier,
}) => {
	const [
		linkHrefs,
		setLinkHrefs,
	] = useState([])

	const [
		scriptSrcs,
		setScriptSrcs,
	] = useState([])

	useEffect(() => {
		axios(assetManifestLocation)
		.then(response => (
			response
			.json()
		))
		.then(({
			entrypoints,
		}) => {
			setLinkHrefs(
				entrypoints
				.filter(entrypoint => (
					entrypoint
					.match(/^.*?\.css$/)
				))
			)

			setScriptSrcs(
				entrypoints
				.filter(entrypoint => (
					entrypoint
					.match(/^.*?\.js$/)
				))
			)
		})
	}, [assetManifestLocation])

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
				.src = `/${microFrontendIdentifier}/${scriptSrc}`

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
	}, [microFrontendIdentifier, scriptSrcs])

	return (
		<div id={`${microFrontendIdentifier}-loader`}>
			<div id={microFrontendIdentifier} />

			{
				linkHrefs
				.map(linkHref => (
					<link
						href={`/${microFrontendIdentifier}/${linkHref}`}
						key={linkHref}
						rel="stylesheet"
					/>
				))
			}
		</div>
	)
}

export default MicroFrontendLoader
