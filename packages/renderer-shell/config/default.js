const getAbsolutePath = require('./utils/getAbsolutePath')
const routesList = require('./utils/routesList')

module.exports = {
	fakeCdnServerPort: 8001,
	frontendServerPort: 8000,
	isLocalDevelopment: false,
	nodeEnvironment: 'production',
	outputPath: getAbsolutePath('./build'),
	reactRenderTarget: 'renderer-shell',
	routesList,
	microFrontend1ReactRenderTarget: 'micro-frontend-1',
}
