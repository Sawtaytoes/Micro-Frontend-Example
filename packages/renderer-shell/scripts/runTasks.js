const { concatAll, concatMap } = require('rxjs/operators')
const { from } = require('rxjs')

const httpServer$ = require('./tasks/httpServer$')
const lintScripts$ = require('./tasks/lintScripts$')
const webpackBuild$ = require('./tasks/webpackBuild$')
const webpackDevServer$ = require('./tasks/webpackDevServer$')

const tasks = {
	build: [
		webpackBuild$,
	],
	develop: [
		lintScripts$,
		httpServer$,
		webpackDevServer$,
	],
	lint: [
		lintScripts$,
	],
}

const runTasks = ({
	task: taskNames,
}) => {
	from(
		Array.isArray(
			taskNames
		)
		? taskNames
		: [taskNames]
	)
	.pipe(
		concatMap((
			taskName,
		) => (
			tasks[taskName]
		)),
		concatAll(),
	)
	.subscribe({
		complete: () => {
			const dashes = (
				Array(
					process
					.stdout
					.columns
				)
				.fill('-')
				.join('')
			)

			console.info(
				"Completed running all tasks."
			)

			console.info(
				dashes
			)
		},
	})
}

module.exports = runTasks
