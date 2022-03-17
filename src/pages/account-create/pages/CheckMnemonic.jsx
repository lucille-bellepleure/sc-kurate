import React, { useState, useRef, useEffect } from 'react'
import styles from 'styles.module.css'
import createAccount from '../account-create.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { Button, InputAdornment, TextField } from '@material-ui/core'
import { Check } from '@material-ui/icons'

function getMnemonic(state) {
	return state.account.mnemonic
}

export function CheckMnemonic({ nextStage, exitStage, prevStage, avatarStage, username, setUsername, avatar }) {
	const mnemonic = useSelector((state) => getMnemonic(state))
	const dispatch = useDispatch()

	useEffect(() => {
		console.log(mnemonic[2], mnemonic[4], mnemonic[8], mnemonic[10])
	}, [])

	const [word0Validity, setWord0Validity] = useState(false)
	const [word1Validity, setWord1Validity] = useState(false)
	const [word2Validity, setWord2Validity] = useState(false)
	const [word3Validity, setWord3Validity] = useState(false)

	const check0Validity = (num, e) => {
		if (e.target.value === mnemonic[num]) {
			setWord0Validity(true)
		} else {
			setWord0Validity(false)
		}
	}

	const check1Validity = (num, e) => {
		if (e.target.value === mnemonic[num]) {
			setWord1Validity(true)
		} else {
			setWord1Validity(false)
		}
	}

	const check2Validity = (num, e) => {
		if (e.target.value === mnemonic[num]) {
			setWord2Validity(true)
		} else {
			setWord2Validity(false)
		}
	}

	const check3Validity = (num, e) => {
		if (e.target.value === mnemonic[num]) {
			setWord3Validity(true)
		} else {
			setWord3Validity(false)
		}
	}

	return (
		<div className={createAccount.formcontainer}>
			<div className={createAccount.closeButton} onClick={exitStage}>
				<div className={styles.exitgrayicon} />
			</div>
			<div className={createAccount.formtitle}>Check your backup</div>
			<div className={createAccount.formsubtitle}>
				Didn't write it down? You can start over with a{' '}
				<span className={createAccount.link} onClick={prevStage}>
					{' '}
					new seed phrase
				</span>
				.
			</div>
			<div className={createAccount.mnemoniccheck}>
				<div className={createAccount.mnemonicinputbox}>
					<input
						className={createAccount.mnemonicinput}
						placeholder="word 3"
						autoCorrect="off"
						autoCapitalize="none"
						data-lpignore="true"
						onChange={(e) => check0Validity(2, e)}
					></input>
					{word0Validity ? (
						<Check
							style={{
								color: '#23b460',
							}}
						></Check>
					) : (
						<Check
							style={{
								color: '#ffffff',
							}}
						></Check>
					)}
				</div>
				<div className={createAccount.mnemonicinputbox}>
					<input
						className={createAccount.mnemonicinput}
						placeholder="word 5"
						autoCorrect="off"
						autoCapitalize="none"
						data-lpignore="true"
						onChange={(e) => check1Validity(4, e)}
					></input>
					{word1Validity ? (
						<Check
							style={{
								color: '#23b460',
							}}
						></Check>
					) : (
						<Check
							style={{
								color: '#ffffff',
							}}
						></Check>
					)}
				</div>
				<div className={createAccount.mnemonicinputbox}>
					<input
						className={createAccount.mnemonicinput}
						placeholder="word 8"
						autoCorrect="off"
						autoCapitalize="none"
						data-lpignore="true"
						onChange={(e) => check2Validity(8, e)}
					></input>
					{word2Validity ? (
						<Check
							style={{
								color: '#23b460',
							}}
						></Check>
					) : (
						<Check
							style={{
								color: '#ffffff',
							}}
						></Check>
					)}
				</div>
				<div className={createAccount.mnemonicinputbox}>
					<input
						className={createAccount.mnemonicinput}
						placeholder="word 11"
						autoCorrect="off"
						autoCapitalize="none"
						data-lpignore="true"
						onChange={(e) => check3Validity(10, e)}
					></input>
					{word3Validity ? (
						<Check
							style={{
								color: '#23b460',
							}}
						></Check>
					) : (
						<Check
							style={{
								color: '#ffffff',
							}}
						></Check>
					)}
				</div>
			</div>
			{word0Validity && word1Validity && word2Validity && word3Validity ? (
				<div className={createAccount.dialogiconbox}>
					<div tabIndex="2" className={[styles.iconbuttonbig, createAccount.confirm].join(' ')} onClick={nextStage}>
						<div className={styles.nextblueicon} />
					</div>
				</div>
			) : (
				''
			)}
		</div>
	)
}

export default CheckMnemonic
