import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateUser } from 'helpers/instaSwarm'
// Sub-pages
import AccountHome from './pages/AccountHome'
import MyIdentity from './pages/MyIdentity'
import RemoveAccount from './pages/RemoveAccount'
import ChooseAvatar from '../account-create/pages/ChooseAvatar'
import ShortCode from './pages/ShortCode'
import ResolveShort from './pages/ResolveShort'

// Ids
const accountHome = 'accountHome'
const myIdentity = 'myIdentity'
const removeAccount = 'removeAccount'
const avatarStage = 'avatarStage'
const shortcodeStage = 'shortcodeStage'
const resolveShort = 'resolveShort'

function getAccount(state) {
	return state.account
}

function getSystem(state) {
	return state.system
}

export function AccountRoot() {
	const [stage, setStage] = useState(myIdentity)
	const account = useSelector((state) => getAccount(state))
	const system = useSelector((state) => getSystem(state))

	const dispatch = useDispatch()

	const setUsername = (username) => dispatch({ type: 'SET_ACCOUNT', data: { username: username } })
	const setAvatar = (avatar) => dispatch({ type: 'SET_ACCOUNT', data: { avatar: avatar } })

	async function doUpdateUser() {
		console.log('updating user')
		if (!system.passWord) {
			console.log('unlock first')
			dispatch({
				type: 'SET_SYSTEM',
				data: {
					showPasswordUnlock: true,
				},
			})
		} else {
			//setStage(SimpleChecklist)
			console.log('trying to save user')
			const dataObject = {
				user: account,
				password: system.passWord,
			}
			try {
				//setStage(simpleChecklist)

				await updateUser(dataObject, function () {
					//navigate('/home')
				})
				//setStatusState(1)
			} catch (error) {
				//setStatusState(2)
			}
			//dispatch({type: "SHARE_POST", data: dataObject});
		}
	}

	const removeAccountDef = () => {
		dispatch({
			type: 'RESET_ACCOUNT',
		})
		navigate('/')
	}

	const handleShortcode = () => {
		dispatch({
			type: 'CREATE_SHORTCODE',
			data: { username: account.username, useravatar: account.avatar },
		})
		setStage(shortcodeStage)
	}

	const newShort = () => {
		dispatch({
			type: 'CREATE_SHORTCODE',
			data: { username: account.username, useravatar: account.avatar },
		})
	}

	const handleResolveShortcode = (shortcode) => {
		console.log(shortcode)
		//dispatch({ type: "RESOLVE_SHORTCODE", data: shortcode })
		navigate('/verify/' + shortcode)
	}

	const navigate = useNavigate()

	// Router
	switch (stage) {
		case accountHome:
			return (
				<AccountHome
					myIdentityStage={() => setStage(myIdentity)}
					shortCodeStage={() => setStage(shortcodeStage)}
					resolveStage={() => setStage(resolveShort)}
					exitStage={() => navigate('/')}
				></AccountHome>
			)
		case myIdentity:
			return (
				<MyIdentity
					avatar={account.avatar}
					avatarStage={() => setStage(avatarStage)}
					username={account.username}
					setUsername={setUsername}
					setAvatar={setAvatar}
					publicKey={account.publicKey}
					address={account.address}
					nextStage={() => setStage(removeAccount)}
					exitStage={() => setStage(accountHome)}
					shortCode={handleShortcode}
					resolveShort={() => setStage(resolveShort)}
					setUpdateUser={() => doUpdateUser()}
				/>
			)
		case removeAccount:
			return <RemoveAccount nextStage={() => setStage(myIdentity)} removeAccount={removeAccountDef}></RemoveAccount>
		case avatarStage:
			return (
				<ChooseAvatar
					setAvatar={setAvatar}
					avatar={account.avatar}
					exitStage={() => setStage(myIdentity)}
				></ChooseAvatar>
			)
		case shortcodeStage:
			return (
				<ShortCode
					shortcode={account.shortcode}
					nextStage={() => setStage()}
					exitStage={() => setStage()}
					newShort={newShort}
				></ShortCode>
			)

		case resolveShort:
			return (
				<ResolveShort
					nextStage={() => setStage()}
					exitStage={() => setStage()}
					resolveShortcode={handleResolveShortcode}
					peerAvatar={account.peerAvatar}
					peerUsername={account.peerUsername}
					peerAddress={account.peerAddress}
				></ResolveShort>
			)

		default:
			return <h1>Oops...</h1>
	}
}

export default AccountRoot
