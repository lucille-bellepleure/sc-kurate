import React from 'react'
import createAccount from '../account-create.module.css'
import { NavLink } from 'react-router-dom'

const SuccessEnter = () => (
	<div className={createAccount.formcontainer}>
		<div className={createAccount.titleblue}>Success!</div>
		<div className={createAccount.formsubtitle}>You created an account.</div>
		<div className={createAccount.formsubtitle}>Your 12-words list will always give you access to your account.</div>

		<div className={createAccount.passwordflex} />
		<div className={createAccount.passwordflex} />

		<NavLink to="/">
			<div tabIndex="2" className={createAccount.buttongray}>
				<div>
					<div className={createAccount.buttontextblue}>enter swarm.city</div>
				</div>
			</div>
		</NavLink>
	</div>
)

export default SuccessEnter
