import React from 'react'
import main from 'styles.module.css'
import accountstyles from '../account-create.module.css'

export function CreateOrRestore({ createStage, restoreStage, connectWallet, signMessage, exitStage, feedback }) {
	return (
		<div className={accountstyles.container}>
			<div className={accountstyles.closeButton} onClick={exitStage}>
				<div className={main.closeicon} />
			</div>
			<div className={accountstyles.title}>Let's use KeyCard.</div>
			<div className={accountstyles.subtitle}>{feedback}</div>

			<div tabIndex="2" className={accountstyles.button} onClick={connectWallet}>
				<div>
					<div className={accountstyles.buttontext}>connect to web3</div>
				</div>
			</div>

			<div tabIndex="2" className={accountstyles.button}>
				<div>
					<div className={accountstyles.buttontext} onClick={signMessage}>
						sign a message
					</div>
				</div>
			</div>
		</div>
	)
}

export default CreateOrRestore
