const config = require('config')
const { from, of } = require('rxjs')
const { reduce, switchMap } = require('rxjs/operators')

const webpackConfigOptions = [
	{ configKey: 'frontendServerPort' },
	{ configKey: 'isLocalDevelopment' },
	{ configKey: 'nodeEnvironment' },
	{ configKey: 'outputPath' },
	{ configKey: 'webpackDevServerPort' },
]

const createWebpackConfigOptionsObservable = () => (
	of({})
	.pipe(
		switchMap((
			initialWebpackConfigOptions,
		) => (
			from(webpackConfigOptions)
			.pipe(
				reduce(
					(
						webpackConfig,
						{
							configKey,
							transformer = value => value,
						},
					) => ({
						...webpackConfig,
						[configKey]: (
							transformer(
								config
								.get(configKey)
							)
						),
					}),
					initialWebpackConfigOptions,
				),
			)
		)),
	)
)

module.exports = createWebpackConfigOptionsObservable
