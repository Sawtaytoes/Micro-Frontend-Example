import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const useUnknownPathRedirect = () => {
	const history = useHistory()

	useEffect(
		() => {
			const redirectOnUnknownPath = ({
				details,
			}) => {
				if (details.type !== 'unknownPath') {
					return
				}

				history
				.push('/404')
			}

			window
			.addEventListener(
				'eventBusV1',
				redirectOnUnknownPath,
			)

			return () => {
				window
				.removeEventListener(
					'eventBusV1',
					redirectOnUnknownPath,
				)
			}
		},
		[history],
	)
}

export default useUnknownPathRedirect
