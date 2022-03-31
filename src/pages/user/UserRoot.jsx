import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchUser, fetchAvatar } from 'helpers/instaSwarm'
// Sub-pages
import UserHome from './pages/UserHome'
import UserFollowing from './pages/UserFollowing'
import PostDetail from './pages/PostDetail'
import StatusProgressWhite from 'pages/status/StatusProgressWhite'
// Ids
const userFetching = 'userFetching'
const userHome = 'userHome'
const postDetail = 'postDetail'
const userFollowing = 'userFollowing'

function getUser(state) {
	return state.account
}

function getSystem(state) {
	return state.system
}

export function PostItemRoot() {
	const dispatch = useDispatch()
	const [stage, setStage] = useState(userFetching)

	const [userfeed, setUserfeed] = useState([])
	const [usersubs, setUsersubs] = useState([])
	const [user, setUser] = useState()

	const [userAvatar, setUserAvatar] = useState('')

	const account = useSelector((state) => getUser(state))
	const system = useSelector((state) => getSystem(state))

	const params = useParams()
	const address = params.userAddress

	useEffect(
		() => {
			if (address) {
				const getAvatar = async (address) => {
					const avatar = await fetchAvatar(address)
					setUserAvatar(avatar)
					console.log(avatar)
				}

				setStage(userFetching)

				const getUserContent = async (user1) => {
					const fetchedUser = await fetchUser(address)

					setUser(fetchedUser)
					setStage(userHome)

					let arrayPosts = Object.values(fetchedUser.posts)

					setUserfeed(arrayPosts)
					let arraySubs = Object.values(fetchedUser.subscriptions)
					setUsersubs(arraySubs)

					for (let index = 0; index < arrayPosts.length; index++) {
						let post = arrayPosts[index]
						console.log(JSON.stringify(post), post.bzz, address)
						dispatch({
							type: 'RES_POST',
							data: { postId: post.bzz, userAddress: address },
						})
					}
					//arrayPosts.map((post) => dispatch({ type: 'RES_POST', data: { postId: post.bzz, userAddress: address }}))

					//console.log(fetchedUser)
					//console.log(JSON.stringify(arraySubs))
				}
				getAvatar(address)
				getUserContent()
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[address]
	)

	// Router
	switch (stage) {
		case userFetching:
			return <StatusProgressWhite avatar={userAvatar} />
		case userHome:
			return (
				<UserHome
					account={account}
					user={user}
					userfeed={userfeed}
					usersubs={usersubs}
					nextStage={() => setStage(userFollowing)}
					accountUnlock={system.passWord}
				/>
			)
		case userFollowing:
			return (
				<UserFollowing
					account={account}
					user={user}
					userfeed={userfeed}
					usersubs={usersubs}
					nextStage={() => setStage()}
					exitStage={() => {
						setStage(userHome)
					}}
				/>
			)
		case postDetail:
			return <PostDetail account={account} user={user} nextStage={() => setStage(userHome)}></PostDetail>

		default:
			return <h1>Oops...</h1>
	}
}

export default PostItemRoot
