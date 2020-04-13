import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { hot } from 'react-hot-loader/root'

import App from './App'

const ClientRoot = () => (
	<BrowserRouter>
		<App />
	</BrowserRouter>
)

export default hot(ClientRoot)
