import React from 'react'
import { Link, Redirect, Route, Switch } from 'react-router-dom'

import MicroFrontendLoader from './MicroFrontendLoader'
import MicroFrontendLoaderIframe from './MicroFrontendLoaderIframe'
import useUnknownPathRedirect from './hooks/useUnknownPathRedirect'

const App = () => {
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
			</nav>

			<Switch>
			<Route path="/micro-frontend-1">
				<MicroFrontendLoader
					assetManifestLocation="/micro-frontend-1/asset-manifest.json"
					microFrontendIdentifier="micro-frontend-1"
				/>
			</Route>

			<Route path="/micro-frontend-1-iframe">
				<MicroFrontendLoaderIframe
					indexHtmlLocation="/micro-frontend-1/app.html"
					microFrontendIdentifier="micro-frontend-1"
				/>
			</Route>

			<Route path="/micro-frontend-2">
				<MicroFrontendLoader
					assetManifestLocation="/micro-frontend-2/asset-manifest.json"
					microFrontendIdentifier="micro-frontend-2"
				/>
			</Route>

			<Route path="/micro-frontend-2-iframe">
				<MicroFrontendLoaderIframe
					indexHtmlLocation="/micro-frontend-2/app.html"
					microFrontendIdentifier="micro-frontend-2"
				/>
			</Route>

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
