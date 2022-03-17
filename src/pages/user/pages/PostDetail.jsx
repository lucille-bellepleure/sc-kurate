import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import main from 'styles.module.css'
import { useParams, useNavigate, NavLink } from 'react-router-dom'

import { Home, AddCircle, ArrowBackIos } from '@material-ui/icons'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import PosterChild from 'components/PosterChild'
import moment from 'moment'

import { Avatar } from '@material-ui/core'
import { deletePost, fetchPost } from 'helpers/instaSwarm.js'

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

function getPosts(state) {
	return state.postState
}

function getSystem(state) {
	return state.system
}

function getAccount(state) {
	return state.account
}

function getUserFromState(state, address) {
	return state.users[address]
}

export function PostDetail({ nextStage }) {
	const dispatch = useDispatch()
	const params = useParams()
	const bzzPost = params.bzzPost
	const userAddress = params.userAddress

	const navigate = useNavigate()

	const system = useSelector((state) => getSystem(state))
	const account = useSelector((state) => getAccount(state))
	const posts = useSelector((state) => getPosts(state))
	const user = useSelector((state) => getUserFromState(state, userAddress))

	const [post, setPost] = useState({
		id: 0,
		address: '0x0',
		avatar: 'a',
		username: 'waiting',
		caption: 'waiting',
		location: 'unknown',
		time: '',
	})

	useEffect(() => {
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
	}, [])

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

	const [followButtonState, setFollowButtonState] = useState('isme')
	const JSONFetcher = (url) => fetch(url).then((r) => r.text())

	return (
		<ThemeProvider theme={theme}>
			<div className={main.container}>
				<div className={main.header}>
					<div>
						<NavLink className={main.textbutton} to={'/user/' + userAddress}>
							<ArrowBackIos color="primary"></ArrowBackIos>
						</NavLink>
					</div>
					<div className={[main.textbutton, main.bodyDefault, main.blue].join()}>
						{/* {user.account.username} */}
						{/* {post.caption} */}
					</div>
					<div>&nbsp;</div>
				</div>

				{/* 
      <div className={styles.scroller}>
        {userfeed.map(item => getPost(item.bzz))}
      </div> */}
				<div className={main.scroller}>
					<div className={main.postHead}>
						<NavLink to={'/user/' + userAddress}>
							<Avatar src={post.avatar} className={main.avatar}></Avatar>
						</NavLink>
						<div>
							<div className={main.postUsername}>
								<b>{post.username}</b>
							</div>
							<div className={main.postLocation}>{post.location}</div>
						</div>
					</div>
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

					<div className={main.postFooter}>
						{/* <div citemlassName={main.likes}>
                            {item.ilike
                                ? <Favorite
                                    onClick={() => dispatch({ type: 'SET_LIKE', data: { _id: item._id, ilike: false } })} color="secondary" fontSize="small"></Favorite>
                                : <FavoriteBorder
                                    onClick={() => dispatch({ type: 'SET_LIKE', data: { _id: item._id, ilike: true } })}
                                    color="primary" fontSize="small"></FavoriteBorder>
                            }
                                    &nbsp;
                                    <b>{item.likes}</b></div> */}
						<div className={main.smallestBold}>{moment(post.time).fromNow()}</div>
						<div>{post.caption}</div>
						<a
							className={main.blueLink}
							href={'https://goerli.etherscan.io/token/0x3487d9fd4ead3bf081a679176e1eaff91ecd95ff?a=' + post.serial}
							target="_blank"
						>
							NFT on Etherscan
						</a>

						<div
							onClick={() => {
								deletePostAction()
							}}
						>
							Delete this post
						</div>
					</div>
				</div>

				<div className={main.footer}>
					<div className={main.textbutton}>
						<NavLink to="/home">
							<Home color="primary" fontSize="large"></Home>
						</NavLink>
					</div>
					<div className={main.textbutton}>
						{account.status === 'noAccount' ? (
							<NavLink to="/create-account">
								<AddCircle color="primary" fontSize="large"></AddCircle>
								{/* <div className={main.iconbuttonbig}>
                                <div className={main.plusicon}></div>
                            </div> */}
							</NavLink>
						) : (
							<NavLink to="/post-item">
								<AddCircle color="primary" fontSize="large"></AddCircle>
								{/* <div className={main.iconbuttonbig}>
                                <div className={main.plusicon}></div>
                            </div> */}
							</NavLink>
						)}
					</div>

					<div className={main.textbutton}>
						{account.status === 'noAccount' ? (
							<NavLink to="/create-account">
								<img className={main.avatarImage} src={account.avatar}></img>
							</NavLink>
						) : (
							<NavLink to="/account">
								<img className={main.avatarImage} src={account.avatar}></img>
							</NavLink>
						)}
					</div>
				</div>
			</div>
		</ThemeProvider>
	)
}

export default PostDetail
