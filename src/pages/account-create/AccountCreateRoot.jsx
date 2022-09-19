import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import defaultAvatar from 'images/defaultAvatar.png'
import typedDataV4 from './typedDataV4'

// Sub-pages
import CreateOrRestore from './pages/CreateOrRestore'
import ShowMnemonic from './pages/ShowMnemonic'
import CheckMnemonic from './pages/CheckMnemonic'
import ChooseUsername from './pages/ChooseUsername'
import ChooseAvatar from './pages/ChooseAvatar'
import ChoosePassword from './pages/ChoosePassword'
import SuccessEnter from './pages/SuccessEnter'
import RestoreAccountStart from './pages/RestoreAccountStart'
import StatusProgressWhite from 'pages/status/StatusProgressWhite'

// Ids
const createOrRestore = 'createOrRestore'
const showMnemonic = 'showMnemonic'
const checkMnemonic = 'checkMnemonic'
const chooseUsername = 'chooseUsername'
const chooseAvatar = 'chooseAvatar'
const choosePassword = 'choosePassword'
const successStage = 'successStage'

const restoreAccountStart = 'restoreAccountStart'

const statusStage = 'statusStage'

function getAccount(state) {
	return state.account
}

export function AccountCreateRoot() {
	const [stage, setStage] = useState(createOrRestore)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	// User Creation state
	const [username, setUsername] = useState('')
	const [avatar, setAvatar] = useState(defaultAvatar)
	const [password, setPassword] = useState('')

	const [feedback, setFeedback] = useState('No feedback')

	const accountData = useSelector((state) => getAccount(state))
	//console.log(accountData)

	if (accountData.status === 'accountSet') {
		navigate('/home')
		//setStatusState(2)
	}

	const domain = [
		{ name: 'name', type: 'string' },
		{ name: 'version', type: 'string' },
		{ name: 'chainId', type: 'uint256' },
		{ name: 'verifyingContract', type: 'address' },
	]

	const unit = [
		{ name: 'actionType', type: 'string' },
		{ name: 'timestamp', type: 'uint256' },
		{ name: 'authorizer', type: 'string' },
	]

	//    const chainId = 42;
	const chainId = 5 // goerli testnet

	const domainData = {
		name: 'VerifierApp101',
		version: '1',
		chainId: chainId,
		verifyingContract: '0x8c1eD7e19abAa9f23c476dA86Dc1577F1Ef401f5',
	}

	var message = {
		actionType: 'Action7440',
		timestamp: 1570112162,
		authorizer: 'auth239430',
	} // order of the fields is is important. Should correspond to the tuple type expected on the contract.

	const data = JSON.stringify({
		types: {
			EIP712Domain: domain,
			Unit: unit,
		},
		domain: domainData,
		primaryType: 'Unit',
		message: message,
	})

	function parseSignature(signature) {
		var r = signature.substring(0, 64)
		var s = signature.substring(64, 128)
		var v = signature.substring(128, 130)

		return {
			r: '0x' + r,
			s: '0x' + s,
			v: parseInt(v, 16),
		}
	}

	const getWallet = async () => {
		try {
			// Will open the MetaMask UI
			// You should disable this button while the request is pending!
			console.log('initialize wallet')
			//const isMetaMaskInstalled = () => {
			//Have to check the ethereum binding on the window object to see if it's installed
			const { ethereum } = window
			console.log(ethereum)
			const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
			console.log(accounts)

			//const message = JSON.stringify('hi')

			//alert(JSON.stringify(signed.result))
			//setFeedback(signed.result)

			//const signature = parseSignature(signed.result.substring(2))
			//console.log(accounts)
			//alert(signature)
		} catch (error) {
			console.error(error)
		}
	}

	const doSignMessage = async () => {
		try {
			const { ethereum } = window
			const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

			const signed = await ethereum
				.request({
					method: 'keycard_signTypedData',
					params: [accounts[0], data],
				})
				.then((err, res) => {
					setFeedback(err)
				})
		} catch (error) {
			console.log(error)
		}
	}

	const createAccount = (password) => {
		const accountObj = {
			type: accountData.type,
			avatar: avatar,
			username: username,
			password: password,
			address: accountData.address,
			publicKey: accountData.publicKey,
			privateKey: accountData.privateKey,
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
					connectWallet={() => getWallet()}
					signMessage={() => doSignMessage()}
					exitStage={() => navigate(-1)}
					feedback={feedback}
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
					toProgress={() => setStage(statusStage)}
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

		case statusStage:
			return <StatusProgressWhite />

		default:
			return <h1>Oops...</h1>
	}
}

export default AccountCreateRoot
