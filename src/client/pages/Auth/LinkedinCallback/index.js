import React, { useEffect } from 'react';
import { queryToObject } from 'client/utils/generic'
import Loading from 'client/components/Loading'

export default (props) => {
	useEffect(() => {
		const params = queryToObject(window.location.search)
		if (params.code) {
			window.opener.postMessage(params)
		}
	}, []);

	return (
		<Loading/>
	)
}