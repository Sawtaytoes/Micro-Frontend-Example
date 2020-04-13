import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { hot } from 'react-hot-loader/root'

import App from './App'

const ServerRoot = ({
	context,
	location,
}) => (
	<StaticRouter
		context={context}
		location={location}
	>
		<App />
	</StaticRouter>
)

export default hot(ServerRoot)
