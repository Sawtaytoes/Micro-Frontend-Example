import React from 'react'

const MicroFrontend1App = () => (
	<div
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
