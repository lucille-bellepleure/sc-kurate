import React from 'react'
import main from '../styles.module.css'
import { Player } from 'video-react'
import { NavLink } from 'react-router-dom'
import { Avatar } from '@material-ui/core'

function PosterChild({ image, type, creator }) {
	//console.log(image, format)
	switch (type) {
		case 'video':
			return (
				<div className={main.video}>
					<Player autoPlay loop playsInline muted width="100%" src={require('../images/' + image)}></Player>
				</div>
			)
		case 'post':
			return (
				<div className={main.posterChildContainer}>
					<div
						className={main.posterChild}
						style={{
							backgroundImage: `url(${image})`,
							backgroundRepeat: 'no-repeat',
							backgroundSize: '100%',
						}}
					></div>
				</div>
			)
		case 'repost':
			return (
				<div className={main.posterChildContainer}>
					<div
						className={main.posterChild}
						style={{
							backgroundImage: `url(${image})`,
							backgroundRepeat: 'no-repeat',
							backgroundSize: '100%',
						}}
					></div>
					<NavLink to={'/user/' + creator.originalAddress} className={main.postRepostCreator}>
						<Avatar
							src={creator.originalAvatar}
							className={main.repostAvatar}
							style={{ width: 28, height: 28 }}
						></Avatar>

						<div className={main.postUsername}>
							<b>{creator.originalUsername}</b>
						</div>
					</NavLink>
				</div>
			)

		default:
			return null
	}
}

export default PosterChild
