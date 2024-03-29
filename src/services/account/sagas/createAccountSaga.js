import { put } from 'redux-saga/effects'
import { setFeed } from 'helpers/swarmFeed'

export default function* createAccountSaga(action) {
	console.log('CreateAccount Saga', action.data)
	const userObject = action.data

	const encryptedPrivateKey = window.myWeb3.eth.accounts.encrypt(userObject.privateKey, userObject.password)

	if (!userObject.type) {
		userObject.type = 'create'
	}

	if (userObject.type === 'create') {
		// Here we set the user data object to a feed
		try {
			yield setFeed(
				'userdata',
				{
					username: userObject.username,
					useravatar: userObject.avatar,
					publicKey: userObject.publicKey,
					address: userObject.address,
				},
				userObject.privateKey
			)
		} catch (error) {
			console.error(error)
		}

		// Here we create an empty userPosts feed

		try {
			//const checkExisitingPosts = yield getFeed('userposts', userObject.address)

			//if (checkExisitingPosts.code === 500) {
			yield setFeed('userposts', { posts: {} }, userObject.privateKey)
			// }
		} catch (error) {
			console.error(error)
		}

		// Here we create empty userSubs feed

		try {
			// const checkExistingSubscriptions = yield getFeed('usersubscriptions', userObject.address)
			// if (checkExistingSubscriptions.code === 500) {

			// Swarm city official 0xA15413eec51773e94a1f294B02Fd826B0A4774af
			yield setFeed('usersubscriptions', {
		'0xA15413eec51773e94a1f294B02Fd826B0A4774af': {},
		'0x7d47Cd305ACa96F75aDf31d488fF30E49FD4239f': {}
	  }, userObject.privateKey)
			// }
		} catch (error) {
			console.error(error)
		}
	}
	const accountObj = {
		address: userObject.address,
		avatar: userObject.avatar,
		username: userObject.username,
		status: 'accountSet',
		mnemonic: null,
		privateKey: encryptedPrivateKey,
		publicKey: userObject.publicKey,
		subscriptions: userObject.subscriptions,
		posts: userObject.posts,
	}

	yield put({ type: 'SET_ACCOUNT', data: accountObj })
}
