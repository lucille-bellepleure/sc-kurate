import React, { useEffect, useState } from 'react'
import styles from 'styles.module.css'
import verifystyle from '../verify.module.css'

//import createAccount from "../account.module.css";
//import QRCode from "react-qr-code";

export function ResolveShort({ nextStage, userVerify = { username: 'Fetching', avatar: 'Fetching' }, exitStage }) {
	// const handleResolveShort = () => {
	//     console.log("Short code to resolve: ", shortcode)
	//     resolveShortcode(shortcode)

	// }

	// const handleShortChange = (e) => {
	//     setShortcode(e.target.value)
	// }
	useEffect(() => {
		console.log(userVerify)
	}, [userVerify])

	return (
		<div className={verifystyle.formcontainer}>
			<div className={verifystyle.closeButton} onClick={exitStage}>
				<div className={styles.exitgrayicon} />
			</div>

			<div className={verifystyle.formtitle}>Verify user</div>
			<div className={verifystyle.formsubtitle}>Verifying this user means that you vouch for this user's identity.</div>

			<div className={verifystyle.flexer} />
			<div className={verifystyle.flexer} />
			<div className={verifystyle.placeholder}>
				<img className={verifystyle.avatarImage} src={userVerify.avatar} alt="avatar" />
			</div>
			<div className={verifystyle.username}>{userVerify.username}</div>

			<div className={verifystyle.flexer} />

			<div className={verifystyle.dialogiconbox}>
				<div onClick={exitStage} className={[styles.iconbuttonbig, verifystyle.cancel].join(' ')}>
					<div className={styles.xmarkicon} />
				</div>
				<div className={[styles.iconbuttonbig, verifystyle.confirm].join(' ')} onClick={nextStage}>
					<div className={styles.vmarkicon} />
				</div>
			</div>
		</div>
	)
}

export default ResolveShort
