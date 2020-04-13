import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import Html from '../components/Html'

const htmlString = (
	'<!DOCTYPE html>'
	.concat(
		renderToStaticMarkup(
			<Html />
		)
	)
)

const server = ({
	// request,
	response,
}) => (
	response
	.send(
		htmlString
	)
)

export default server
