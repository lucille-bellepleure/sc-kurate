import React, { useState } from 'react'
import styles from 'styles.module.css'
import createAccount from '../account.module.css'
import QRCode from 'react-qr-code'
import { AccountCircle, AccountBalanceWallet, Loyalty, VerifiedUser } from '@material-ui/icons'
import { Route, NavLink } from 'react-router-dom'

const AccountHome = ({ nextStage, exitStage, avatar, username, myIdentityStage, shortCodeStage, resolveStage }) => (
	<div className={createAccount.formcontainer}>
		<div className={createAccount.closeButton} onClick={exitStage}>
			<div className={styles.exitgrayicon} />
		</div>
		<div className={createAccount.flexer}></div>
		<div className={createAccount.homemenu}>
			<div className={createAccount.menuitem} onClick={myIdentityStage}>
				<AccountCircle></AccountCircle>
				<div>Account settings</div>
			</div>
			<div className={createAccount.menuitem}>
				<AccountBalanceWallet></AccountBalanceWallet>
				<div>Wallet</div>
			</div>
			<div className={createAccount.menuitem} onClick={shortCodeStage}>
				<VerifiedUser></VerifiedUser>
				<div>Get verified</div>
			</div>
			<div className={createAccount.menuitem} onClick={resolveStage}>
				<Loyalty></Loyalty>
				<div>Verify a friend</div>
			</div>
		</div>
		{/* <div onClick={() => } className={createAccount.showkeystoggle}>show publicKey</div> */}
		<div className={createAccount.flexer} />
		<div onClick={nextStage} className={createAccount.removeButton}>
			Remove account
		</div>
	</div>
)

export default AccountHome
