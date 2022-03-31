import React from 'react'
import styles from './simple-status.module.css'

export function SimpleChecklist() {
	return (
		<div className={styles.statusbox}>
			<div className={styles.bar}>
				<div className={styles.loading}>
					<div className={[styles.smallpointBlue, styles.point1].join(' ')} />
					<div className={[styles.smallpointBlue, styles.point2].join(' ')} />
					<div className={[styles.smallpointBlue, styles.point3].join(' ')} />
				</div>
			</div>
		</div>
	)
}

export default SimpleChecklist
