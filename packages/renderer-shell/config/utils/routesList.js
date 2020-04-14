const getAbsolutePath = require('./getAbsolutePath')

const getBundleCacheLocation = (
	filename
) => (
	getAbsolutePath(
		'.serverBundleCache'
		.concat(`/${filename}`)
	)
)

const routesList = [
	{
		assetsManifestLocation: 'http://localhost:8001/microfrontend1',
		bundleCacheFilename: (
			getBundleCacheLocation(
				'server.microFrontend1.bundle.js'
			)
		),
		rootPath: '/micro-frontend-1',
	},
]

module.exports = routesList
