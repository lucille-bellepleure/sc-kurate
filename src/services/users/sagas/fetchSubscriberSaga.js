import { all, call, delay, put, select, fork } from 'redux-saga/effects'
import resolvePostSaga from '../../postState/sagas/resolvePostSaga'
import { getAccount } from 'services/account/selectors'
import { setFeed, getFeed, downloadData, uploadData } from 'helpers/swarmFeed'

export default function* fetchSubscriberSaga(action) {
	console.log('Fetch Subscribers Posts Saga', action)

	let initialState = {
		posts: {},
	}

	// Resolve subscriber
	const account = yield select(getAccount)
	console.log(account)
	//const decryptedPrivateKey = window.myWeb3.eth.accounts.decrypt(account.privateKey, '1234');
	//console.log(decryptedPrivateKey.address, decryptedPrivateKey.privateKey)

	const personPosts = yield getFeed('userposts', action.address)

	const postsArray = Object.keys(personPosts.res.posts)

	yield all(postsArray.map((x) => call(resolvePostSaga, { postId: x, userAddress: action.address })))

	yield put({ type: 'SET_HOMEFEED', data: personPosts.res.posts })
}
