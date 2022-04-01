import { rePost } from 'helpers/instaSwarm'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// Sub-pages
import HomeFeed from './pages/HomeFeed'
import SimpleChecklist from 'pages/status/SimpleChecklist'

// Ids
const homeFeed = 'homeFeed'
const simpleChecklist = 'simpleChecklist'

function getHomefeed(state) {
	return state.homefeed
}

function getSystem(state) {
	return state.system
}

function getUser(state) {
	return state.account
}

export function HomeFeedRoot() {
	const [stage, setStage] = useState(homeFeed)
	const homefeedObject = useSelector((state) => getHomefeed(state))
	const homefeed = Object.values(homefeedObject)
	const system = useSelector((state) => getSystem(state))
	const account = useSelector((state) => getUser(state))
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [statusState] = useState(1)

	async function tryRePost(post) {
		console.log('reposting post')
		if (!system.passWord) {
			console.log('unlock first')
			dispatch({
				type: 'SET_SYSTEM',
				data: {
					showPasswordUnlock: true,
				},
			})
		} else {
			//setStage(SimpleChecklist)
			console.log('trying to REpost')
			const dataObject = {
				post: post,
				user: account,
				password: system.passWord,
			}
			try {
				setStage(simpleChecklist)

				await rePost(dataObject, function () {
					setStage(homeFeed)
				})
				//setStatusState(1)
			} catch (error) {
				//setStatusState(2)
			}
			//dispatch({type: "SHARE_POST", data: dataObject});
		}
	}

	// Router
	switch (stage) {
		case homeFeed:
			return <HomeFeed homefeed={homefeed} rePost={(post) => tryRePost(post)} nextStage={() => setStage()} />
		case simpleChecklist:
			return (
				<SimpleChecklist
					title="Re-posting"
					titleDone="Post successfully reposted."
					titleError="Something went wrong."
					status={statusState}
					successStage={() => {
						setStage(homeFeed)
					}}
					cancel={() => {
						navigate(-1)
					}}
				></SimpleChecklist>
			)
		default:
			return <h1>Oops...</h1>
	}
}

export default HomeFeedRoot
