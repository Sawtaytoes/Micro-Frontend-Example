const getAbsolutePath = require('./utils/getAbsolutePath')

module.exports = {
	frontendServerPort: 8000,
	isLocalDevelopment: false,
	nodeEnvironment: 'production',
	outputPath: getAbsolutePath('./build'),
	reactRenderTarget: 'renderer-shell',
	webpackDevServerPort: 8001,
}
