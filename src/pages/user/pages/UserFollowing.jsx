import React from 'react'
import main from 'styles.module.css'
import styles from '../user.module.css'
import { Link } from 'react-router-dom'
import { ArrowBackIos } from '@material-ui/icons'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import FooterBar from 'components/FooterBar'

const theme = createTheme({
	// Style sheet name ⚛️
	palette: {
		primary: { main: '#333333' },
		secondary: { main: '#f55858' },
	},
})
const scrollTop = () => {}

export function UserFollowing({ exitStage, user, usersubs, account }) {
	return (
		<ThemeProvider theme={theme}>
			<div className={main.container}>
				<div className={main.header}>
					<div onClick={exitStage}>
						<ArrowBackIos color="primary"></ArrowBackIos>
					</div>
					<div className={[main.textbutton, main.bodyDefault, main.blue].join()}>{user.username}</div>
					<div>&nbsp;</div>
				</div>
				<div className={styles.followingList}>
					{usersubs.map((item) => (
						<Link to={'/user/' + item.address}>
							<div className={styles.followingListItem}>
								<img className={styles.followingListAvatar} src={item.avatar} alt="avatar" />
								<div>
									<div className={styles.userName}>{item.username}</div>
									<div className={styles.userAddress}>{item.address}</div>
								</div>
							</div>
						</Link>
					))}
				</div>
				<FooterBar account={account} scrollTop={scrollTop}></FooterBar>
			</div>
		</ThemeProvider>
	)
}

export default UserFollowing
