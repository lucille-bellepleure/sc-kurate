import { put, select } from 'redux-saga/effects'
import { getAccount } from 'services/account/selectors'
import { setFeed } from 'helpers/swarmFeed'

export default function* unfollowUserSaga(action) {
	console.log('unfollow user saga', action.data)
	const account = yield select(getAccount)
	const decryptedPrivateKey = window.myWeb3.eth.accounts.decrypt(account.privateKey, action.data.password)
	console.log(decryptedPrivateKey.address, decryptedPrivateKey.privateKey)

	const currentSubs = action.data.currentSubs
	const addressToFollow = action.data.address

	delete currentSubs[addressToFollow]

	yield setFeed('usersubscriptions', currentSubs, decryptedPrivateKey.privateKey)

	yield put({ type: 'RESOLVE_ACCOUNT' })
}
