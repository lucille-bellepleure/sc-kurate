import React, { useState } from 'react'
import styles from 'styles.module.css'
import createAccount from 'pages/account/account.module.css'

const RestoreAccountCheck = ({ nextStage, exitStage, avatar, userName }) => (
	<div className={createAccount.formcontainer}>
		<div className={createAccount.closeButton} onClick={exitStage}>
			<div className={styles.exitgrayicon} />
		</div>
		<div className={createAccount.placeholder}>
			<img className={createAccount.avatarImage} src={avatar} alt="avatar" />
		</div>
		<div className={createAccount.flexer} />

		<div className={createAccount.usernameinputbox}>{userName}</div>

		<div className={createAccount.flexer} />
		<div tabIndex="2" className={[styles.iconbuttonbig, createAccount.confirm].join(' ')}>
			<div className={styles.nextblueicon} />
		</div>
	</div>
)

export default RestoreAccountCheck
