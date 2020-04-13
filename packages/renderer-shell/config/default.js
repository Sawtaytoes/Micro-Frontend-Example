const getAbsolutePath = require('./utils/getAbsolutePath')

module.exports = {
	frontendServerPort: 8000,
	isLocalDevelopment: false,
	nodeEnvironment: 'production',
	outputPath: getAbsolutePath('./build'),
	webpackDevServerPort: 8001,
}
