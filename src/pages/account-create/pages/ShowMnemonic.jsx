import React, { useEffect } from 'react'

import styles from 'styles.module.css'
import createAccount from '../account-create.module.css'
import { useSelector, useDispatch } from 'react-redux'

import { createMnemonic } from 'services/account/actions'
function getMnemonic(state) {
	return state.account.mnemonic
}

export function ShowMnemonic({ nextStage, exitStage }) {
	const mnemonic = useSelector((state) => getMnemonic(state))
	const dispatch = useDispatch()

	useEffect(
		() => {
			dispatch(createMnemonic())
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	)

	return (
		<div className={createAccount.formcontainer}>
			<div className={createAccount.closeButton} onClick={exitStage}>
				<div className={styles.exitgrayicon} />
			</div>
			<div className={createAccount.formtitle}>Carefully write down these words:</div>
			<div className={createAccount.mnemonic}>
				{mnemonic.map((word, index) => (
					<div>{index + 1 + '. ' + word}</div>
				))}
			</div>
			<div className={createAccount.dialogiconbox}>
				<div tabIndex="2" className={[styles.iconbuttonbig, createAccount.confirm].join(' ')} onClick={nextStage}>
					<div className={styles.nextblueicon} />
				</div>
			</div>
		</div>
	)
}

export default ShowMnemonic
