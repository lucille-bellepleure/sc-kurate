import React, { useState, useRef } from 'react'
import { Form, FormProvider } from 'react-advanced-form'
import { TextField } from '@material-ui/core'
import styles from 'styles.module.css'
import createAccount from '../account-create.module.css'
import { getFeed } from 'helpers/swarmFeed'
import { ethers } from 'ethers'
import { useDispatch } from 'react-redux'
import StatusProgress from 'pages/status/StatusProgress'

window.ethers = ethers

export function RestoreAccountStart({ nextStage, exitStage, setUsername, setAvatar }) {
	let refText = useRef(null)

	let [showProgress, setShowProgress] = useState(false)

	const [mnemonicInput, setMnemonicInput] = useState('')

	const validationRules = {}

	const handleSubmit = () => {
		nextStage()
	}

	const dispatch = useDispatch()

	const handleChange = (e) => {
		console.log(e.target.value)
		setMnemonicInput(e.target.value)
	}

	const restoreMnemonic = async () => {
setShowProgress(true)
		const wallet = await ethers.Wallet.fromMnemonic(mnemonicInput)
		const userdata = await getFeed('userdata', wallet.address)
		setAvatar(userdata.res.useravatar)
		setUsername(userdata.res.username)

		const accountObj = {
			type: "restore",
			address: wallet.address,
			publicKey: wallet.publicKey,
			privateKey: wallet.privateKey,
			mnemonic: wallet.mnemonic,
			avatar: userdata.res.useravatar,
			username: userdata.res.username
		}

		dispatch({ type: 'SET_ACCOUNT', data: accountObj })
		nextStage()
	}

	return (
		<div className={createAccount.formcontainer}>
			<FormProvider>
				<Form rules={validationRules} action={handleSubmit}>
					<div className={createAccount.closeButton} onClick={exitStage}>
						<div className={styles.exitgrayicon} />
					</div>
					<div className={createAccount.formtitle}>Restore your account</div>
					<div className={createAccount.mnemoniccheck}>
						<div>
							<TextField
								className={createAccount.textField}
								ref={refText}
								onChange={(e) => handleChange(e)}
								id="outlined-multiline-static"
								label="Wordlist backup"
								multiline
								rows={6}
								placeholder="12 Word mnemonic"
								variant="outlined"
							/>
						</div>
					</div>
				
					{ showProgress ? <StatusProgress />
					 
					: 
					<div className={createAccount.dialogiconbox}>
						<div
							tabIndex="2"
							className={[styles.iconbuttonbig, createAccount.confirm].join(' ')}
							onClick={() => restoreMnemonic()}
						>
							<div className={styles.nextblueicon} />
						</div>
					</div>
				
					}
				

				</Form>
			</FormProvider>
		</div>
	)
}

export default RestoreAccountStart
