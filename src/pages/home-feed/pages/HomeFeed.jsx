import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import main from 'styles.module.css'
import { NavLink } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { Avatar } from '@material-ui/core'
import PosterChild from 'components/PosterChild'
import sortByProp from 'helpers/sortByProp'
import moment from 'moment'
import FooterBar from 'components/FooterBar'
import { RepeatRounded } from '@material-ui/icons'

// import AccountUnlock from "components/AccountUnlock"

const theme = createTheme({
	// Style sheet name ⚛️
	palette: {
		primary: { main: '#333333' },
		secondary: { main: '#f55858' },
	},
})

function getUser(state) {
	return state.account
}

function getPosts(state) {
	return state.postState
}

export function HomeFeed({ homefeed, rePost }) {
	const account = useSelector((state) => getUser(state))
	const posts = useSelector((state) => getPosts(state))
	const dispatch = useDispatch()

	const getPost = (bzz) => {
		const item = posts[bzz]
		if (item) {
			return (
				<div key={item._id} className={main.postContainer}>
					<PosterChild
						type={item.type}
						image={item.image}
						creator={item}
						onDoubleClick={() =>
							dispatch({
								type: 'SET_LIKE',
								data: { _id: item._id, ilike: true },
							})
						}
					></PosterChild>
					{item.caption ? <div className={main.postCaption}>{item.caption}</div> : null}
					<div className={main.postHead}>
						<NavLink to={'/user/' + item.address}>
							<Avatar src={item.avatar} className={main.avatar}></Avatar>
						</NavLink>
						<div>
							<NavLink to={'/user/' + item.address}>
								<div className={main.postUsername}>
									<b>{item.username}</b>
								</div>
								<div className={main.postLocation}>{moment(item.time).fromNow()}</div>
							</NavLink>
						</div>
						{item.address == account.address ? null : (
							<div className={main.postRepostIcon}>
								<RepeatRounded onClick={() => rePost(item)}></RepeatRounded>
							</div>
						)}
					</div>

					{/* <ActionButton type={item.type}></ActionButton> */}
					{/* <div className={main.postFooter}>
						<div className={main.likes}>
							{item.ilike ? (
								<Favorite
									onClick={() => dispatch({ type: 'SET_LIKE', data: { _id: item._id, ilike: false } })}
									color="secondary"
									fontSize="small"
								></Favorite>
							) : (
								<FavoriteBorder
									onClick={() => dispatch({ type: 'SET_LIKE', data: { _id: item._id, ilike: true } })}
									color="primary"
									fontSize="small"
								></FavoriteBorder>
							)}
							&nbsp;
							<b>{item.likes}</b>
						</div>
						<div className={main.smallestBold}>{moment(item.time).fromNow()}</div>

						<div>{item.caption}</div>
						<NavLink className={main.blueLink} to={'/post/' + bzz + '/' + item.address}>
							Post details
						</NavLink>
					</div> */}
				</div>
			)
		}
	}

	useEffect(
		() => {
			if (account) {
				dispatch({ type: 'RES_HOMEFEED' })
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[account.address]
	)

	return (
		<ThemeProvider theme={theme}>
			<div className={main.container}>
				<div className={main.scroller} id="scroller">
					{homefeed.sort(sortByProp('time', 'desc')).map((item, index) => getPost(item.bzz))}
					<div>
						<div className={main.feedEnd}>
							<div>You're all caught up.</div>
							<div className={main.blue}>Discover more topics</div>
						</div>
					</div>
				</div>
				<FooterBar account={account}></FooterBar>
			</div>
		</ThemeProvider>
	)
}

export default HomeFeed
