import React from 'react'
import styles from './simple-status.module.css'
import main from 'styles.module.css'

export function StatusProgressWhite( ) {
    return <div className={main.container}>
        			<div className={styles.flexer} />
                    <div className={styles.flexer} />
                    <div className={styles.flexer} />
                    <div className={styles.flexer} />
                    <div className={styles.flexer} />
                    <div className={styles.flexer} />
                    <div className={styles.flexer} />
                    <div className={styles.flexer} />
                    <div className={styles.flexer} />
            <div className={styles.statusbox}>
            <div className={styles.bar}>
                <div className={styles.loading}>
                    <div className={[styles.smallpointBlue, styles.point1].join(' ')} />
                    <div className={[styles.smallpointBlue, styles.point2].join(' ')} />
                    <div className={[styles.smallpointBlue, styles.point3].join(' ')} />
                </div>
            </div>
        </div>
    </div>
}

export default StatusProgressWhite
