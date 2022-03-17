import React from 'react'
import { Route, NavLink } from 'react-router-dom'
import { FormProvider, Form, Field } from 'react-advanced-form'
import { useDispatch, useSelector } from 'react-redux'
import { createAccount } from 'services/account/actions'
import { Button, Fab, Divider, Paper, TextField, Typography } from '@material-ui/core'
import { Done, Home } from '@material-ui/icons'
import { Input } from 'react-advanced-form-addons'

import main from 'styles.module.css'
import accountstyles from '../account-create.module.css'

export function CreateOrRestore({ createStage, restoreStage, exitStage }) {
	const dispatch = useDispatch()

	const handleSubmit = ({ serialized, fields, form }) => {
		console.log(serialized)
		dispatch(
			createAccount({
				accountname: serialized.accountname,
				password: serialized.password,
			})
		)
	}

	return (
		<div className={accountstyles.container}>
			<div className={accountstyles.closeButton} onClick={exitStage}>
				<div className={main.closeicon} />
			</div>
			<div className={accountstyles.title}>Let's create an account</div>
			<div className={accountstyles.subtitle}>
				When you restore or create a new account it's stored locally on your device.
			</div>
			<div className={accountstyles.flexer} />
			<div className={accountstyles.flexer} />

			<div tabIndex="2" className={accountstyles.button} onClick={createStage}>
				<div>
					<div className={accountstyles.buttontext}>create account</div>
				</div>
			</div>

			<div tabIndex="2" className={accountstyles.button}>
				<div>
					<div className={accountstyles.buttontext} onClick={restoreStage}>
						restore account
					</div>
				</div>
			</div>
		</div>
	)
}

export default CreateOrRestore
