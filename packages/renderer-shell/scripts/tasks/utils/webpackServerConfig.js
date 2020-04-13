const webpackNodeExternals = require('webpack-node-externals')

const webpackServerConfig = {
	externals: [webpackNodeExternals()],
	target: 'node',
}

module.exports = webpackServerConfig
