import React from 'react'

const MicroFrontend1App = () => (
	<div
		className="App"
		onClick={() => {
			window
			.top
			.dispatchEvent(
				new Event('unknownPath')
			)
		}}
	>
		Micro Frontend 1
	</div>
)

export default MicroFrontend1App
