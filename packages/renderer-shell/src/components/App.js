import React, { useContext } from 'react'
import { Link, Redirect, Route, Switch } from 'react-router-dom'

import ConfigContext from './ConfigContext'
import MicroFrontendLoader from './MicroFrontendLoader'
import useUnknownPathRedirect from './hooks/useUnknownPathRedirect'

const App = () => {
	const config = useContext(ConfigContext)

	useUnknownPathRedirect()

	return (
		<div>
			<header>
				Parent Document Header
			</header>

			<nav>
				<div>
					<Link to="/">Main Route</Link>
				</div>
				<div>
					<Link to="/micro-frontend-1">
						{'Load "Micro Frontend 1"'}
					</Link>
				</div>
				{/*
				<div>
					<Link to="/micro-frontend-1-iframe">
						{'Load "Micro Frontend 1" in iframe'}
					</Link>
				</div>
				<div>
					<Link to="/micro-frontend-2">
						{'Load "Micro Frontend 2"'}
					</Link>
				</div>
				<div>
					<Link to="/micro-frontend-2-iframe">
						{'Load "Micro Frontend 2" in iframe'}
					</Link>
				</div>
				*/}
			</nav>

			<Switch>
				{
					config
					.get('routesList')
					.map(({
						assetsManifestLocation,
						rootPath,
					}) => (
						<Route
							key={rootPath}
							path={rootPath}
						>
							<MicroFrontendLoader
								assetsManifestLocation={assetsManifestLocation}
							/>
						</Route>
					))
				}

				<Route path="/404">
					<div>
						404 - Path not found (this is intentional).
					</div>
				</Route>

				<Route
					exact
					path="/"
				>
					<div
						onClick={() => {
							window
							.top
							.dispatchEvent(
							new Event('unknownPath')
							)
						}}
					>
						Main Route.
					</div>
				</Route>

				<Redirect to="/404" />
			</Switch>

			<footer>
				Parent Document Footer
			</footer>
		</div>
	)
}

export default App
