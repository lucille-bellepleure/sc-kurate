import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import defaultAvatar from 'images/defaultAvatar.png'

// Sub-pages
import CreateOrRestore from './pages/CreateOrRestore'
import ShowMnemonic from './pages/ShowMnemonic'
import CheckMnemonic from './pages/CheckMnemonic'
import ChooseUsername from './pages/ChooseUsername'
import ChooseAvatar from './pages/ChooseAvatar'
import ChoosePassword from './pages/ChoosePassword'
import SuccessEnter from './pages/SuccessEnter'
import RestoreAccountStart from './pages/RestoreAccountStart'
import account from 'services/account/reducer'
import SimpleChecklist from 'pages/status/SimpleChecklist'

// Ids
const createOrRestore = 'createOrRestore'
const showMnemonic = 'showMnemonic'
const checkMnemonic = 'checkMnemonic'
const chooseUsername = 'chooseUsername'
const chooseAvatar = 'chooseAvatar'
const choosePassword = 'choosePassword'
const successStage = 'successStage'
const simpleChecklist = 'simpleChecklist'

const restoreAccountStart = 'restoreAccountStart'

function getAccount(state) {
	return state.account
}

export function AccountCreateRoot() {
	const [stage, setStage] = useState(createOrRestore)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [statusState, setStatusState] = useState(1)


	// User Creation state
	const [username, setUsername] = useState('')
	const [avatar, setAvatar] = useState(defaultAvatar)
	const [password, setPassword] = useState('')

	const accountData = useSelector((state) => getAccount(state))
	//console.log(accountData)

	if (accountData.status === 'accountSet') {
		navigate('/home')
		//setStatusState(2)
	}

	const createAccount = (password) => {
		setStage(simpleChecklist)
		const accountObj = {
			avatar: avatar,
			username: username,
			password: password,
			address: accountData.address,
			publicKey: accountData.publicKey,
			privateKey: accountData.privateKey,
			subscriptions: accountData.subscriptions,
			posts: accountData.posts
		}

		dispatch({ type: 'CREATE_ACCOUNT', data: accountObj })
	}
	



	// Router
	switch (stage) {
		case createOrRestore:
			return (
				<CreateOrRestore
					createStage={() => setStage(showMnemonic)}
					restoreStage={() => setStage(restoreAccountStart)}
					exitStage={() => navigate(-1)}
				/>
			)
		case showMnemonic:
			return (
				<ShowMnemonic
					nextStage={() => setStage(checkMnemonic)}
					exitStage={() => setStage(createOrRestore)}
				></ShowMnemonic>
			)
		case checkMnemonic:
			return (
				<CheckMnemonic
					nextStage={() => setStage(chooseUsername)}
					exitStage={() => setStage(createOrRestore)}
					prevStage={() => setStage(showMnemonic)}
				></CheckMnemonic>
			)
		case chooseUsername:
			return (
				<ChooseUsername
					avatar={avatar}
					setUsername={setUsername}
					username={username}
					nextStage={() => setStage(choosePassword)}
					exitStage={() => setStage(createOrRestore)}
					avatarStage={() => setStage(chooseAvatar)}
				></ChooseUsername>
			)
		case chooseAvatar:
			return (
				<ChooseAvatar
					avatar={defaultAvatar}
					exitStage={() => setStage(chooseUsername)}
					setAvatar={setAvatar}
				></ChooseAvatar>
			)
		case choosePassword:
			return (
				<ChoosePassword
					createAccount={createAccount}
					exitStage={() => setStage(createOrRestore)}
					setPassword={setPassword}
					password={password}
				/>
			)
		case successStage:
			return <SuccessEnter />
		case restoreAccountStart:
			return (
				<RestoreAccountStart
					nextStage={() => setStage(chooseUsername)}
					exitStage={() => setStage(createOrRestore)}
					setAvatar={setAvatar}
					setUsername={setUsername}
				></RestoreAccountStart>
			)
		case simpleChecklist:
			return (
				<SimpleChecklist
					title="Setting up account"
					titleDone="Account setup complete."
					titleError="Something went wrong."
					status={statusState}
					successStage={() => {
						navigate('/home')
					}}
					cancel={() => {
						navigate(-1)
					}}
				></SimpleChecklist>
			)
		default:
			return <h1>Oops...</h1>
	}
}

export default AccountCreateRoot
