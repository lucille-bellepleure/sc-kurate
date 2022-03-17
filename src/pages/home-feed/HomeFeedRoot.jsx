import React, { useState } from 'react'
import { useSelector } from 'react-redux'

// Sub-pages
import HomeFeed from './pages/HomeFeed'

// Ids
const homeFeed = 'homeFeed'

function getHomefeed(state) {
	return state.homefeed
}

export function HomeFeedRoot() {
	const [stage, setStage] = useState(homeFeed)
	const homefeedObject = useSelector((state) => getHomefeed(state))
	const homefeed = Object.values(homefeedObject)

	// Router
	switch (stage) {
		case homeFeed:
			return <HomeFeed homefeed={homefeed} nextStage={() => setStage()} />

		default:
			return <h1>Oops...</h1>
	}
}

export default HomeFeedRoot
