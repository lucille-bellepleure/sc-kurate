import React, { useState } from 'react'
import main from 'styles.module.css'
import styles from './simple-status.module.css'

export function SimpleDialog({ title, text, confirm, cancel }) {
	const [dialogText] = useState(text || 'not found')
	const [dialogTitle] = useState(title || 'not found')

	return (
		<div className={styles.container}>
			<div className={styles.title}>{dialogTitle}</div>
			<div className={styles.subtitle}>{dialogText}</div>
			<div className={styles.flexer} />
			<div className={styles.flexer} />
			<div className={styles.dialogiconbox}>
				<div className={[main.iconbuttonbig, styles.cancel].join(' ')} onClick={cancel}>
					<div className={main.xmarkicon} />
				</div>
				<div className={[main.iconbuttonbig, styles.confirm].join(' ')} onClick={confirm}>
					<div className={main.vmarkicon} />
				</div>
			</div>
		</div>
	)
}

export default SimpleDialog
