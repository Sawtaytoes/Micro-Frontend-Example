// import { renderToStaticMarkup } from 'react-dom/server'

const html = `
	<!DOCTYPE html>
	<html>
		<head>
			<title>Renderer Shell</title>
		</head>
		<body>
			<div id="renderer-shell" />
		</body>
	</html>
`

const server = (
	response,
) => (
	response.send(
		// renderToStaticMarkup(
			html
		// )
	)
)

module.exports = server
