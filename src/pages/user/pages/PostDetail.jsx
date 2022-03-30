import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import main from 'styles.module.css'
import { useParams, useNavigate, NavLink } from 'react-router-dom'

import { Favorite, FavoriteBorder } from '@material-ui/icons'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import PosterChild from 'components/PosterChild'
import moment from 'moment'

import { Avatar } from '@material-ui/core'
import { deletePost, fetchPost } from 'helpers/instaSwarm.js'

import FooterBar from 'components/FooterBar'

const theme = createTheme({
	// Style sheet name ⚛️
	palette: {
		primary: {
			main: '#333333',
		},
		secondary: {
			main: '#f55858',
		},
	},
})

function getSystem(state) {
	return state.system
}

function getAccount(state) {
	return state.account
}

export function PostDetail() {
	const dispatch = useDispatch()
	const params = useParams()
	const bzzPost = params.bzzPost
	const userAddress = params.userAddress

	const navigate = useNavigate()

	const system = useSelector((state) => getSystem(state))
	const account = useSelector((state) => getAccount(state))

	const [post, setPost] = useState({
		id: 0,
		address: '0x0',
		avatar: 'a',
		username: 'waiting',
		caption: 'waiting',
		location: 'unknown',
		time: '',
	})

	useEffect(
		() => {
			//console.log(bzzPost)
			const getPostContent = async (post1) => {
				const fetchedPost = await fetchPost(bzzPost, userAddress)
				setPost(fetchedPost)
			}
			getPostContent()
			// dispatch({ type: 'RES_POST', data: { postId: bzzPost, userAddress: userAddress } })
			// if (posts[bzzPost]) {
			//   setPost(posts[bzzPost])
			//   console.log(post)
			// }
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	)

	const deletePostAction = () => {
		if (!system.passWord) {
			console.log('unlock first')
			dispatch({
				type: 'SET_SYSTEM',
				data: {
					showPasswordUnlock: true,
				},
			})
		} else {
			deletePost(account, system.passWord, bzzPost, post.serial, function () {
				navigate('/user/' + account.address)
			})
		}
	}

	return (
		<ThemeProvider theme={theme}>
			<div className={main.container}>
				<div className={main.scroller}>
					<PosterChild
						format={post.format}
						image={post.image}
						onDoubleClick={() =>
							dispatch({
								type: 'SET_LIKE',
								data: { _id: post.id, ilike: true },
							})
						}
					></PosterChild>
					<div className={main.postHead}>
						<NavLink to={'/user/' + userAddress}>
							<Avatar src={post.avatar} className={main.avatar}></Avatar>
						</NavLink>
						<div>
							<div className={main.postUsername}>
								<b>{post.username}</b>
							</div>
							<div className={main.postLocation}>{moment(post.time).fromNow()}</div>
						</div>
					</div>
					{/* <div className={main.postFooter}>
						<div className={main.likes}>
							{post.ilike ? (
								<Favorite
									onClick={() => dispatch({ type: 'SET_LIKE', data: { _id: post._id, ilike: false } })}
									color="secondary"
									fontSize="small"
								></Favorite>
							) : (
								<FavoriteBorder
									onClick={() => dispatch({ type: 'SET_LIKE', data: { _id: post._id, ilike: true } })}
									color="primary"
									fontSize="small"
								></FavoriteBorder>
							)}
							&nbsp;
							<b>{post.likes}</b>
						</div>
						<div className={main.smallestBold}>{moment(post.time).fromNow()}</div>
						<div>{post.caption}</div>
						<a
							className={main.blueLink}
							href={'https://goerli.etherscan.io/token/0x3487d9fd4ead3bf081a679176e1eaff91ecd95ff?a=' + post.serial}
							target="_blank"
							rel="noreferrer"
						>
							NFT on Etherscan
						</a>

						<div
							onClick={() => {
								deletePostAction()
							}}
							className={main.redLink}
						>
							Delete this post
						</div>
					</div> */}
				</div>

				<FooterBar account={account}></FooterBar>
			</div>
		</ThemeProvider>
	)
}

export default PostDetail
