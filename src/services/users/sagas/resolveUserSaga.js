import { all, call, put } from 'redux-saga/effects'
import resolvePostSaga from '../../postState/sagas/resolvePostSaga'
import { getFeed } from 'helpers/swarmFeed'

export default function* resolveUserSaga(action) {
	console.log('Resolve User Saga', action.data)

	const address = action.data

	// Resolve user
	const userData = yield getFeed('userdata', address)

	//const balances = yield h.fetchBalance(address);
	//const verification = yield h.checkVerification(address);

	// Resolve posts
	const personPosts = yield getFeed('userposts', address)
	const postsArray = Object.keys(personPosts.res.posts)

	yield all(postsArray.map((x) => call(resolvePostSaga, { data: { postId: x, userAddress: address } })))

	// Resolve user's subscriptions
	const userSubs = yield getFeed('usersubscriptions', address)
	console.log('Subscriptions: ', userSubs)
	const userSubsArray = Object.keys(userSubs.res)
	for (let index = 0; index < userSubsArray.length; index++) {
		const sub = userSubsArray[index]
		const subAccount = yield getFeed('userdata', sub)
		userSubs.res[sub].avatar = subAccount.res.useravatar
		userSubs.res[sub].username = subAccount.res.username
		userSubs.res[sub].address = subAccount.res.address
		console.log(userSubs.res[sub])
	}

	const userObject = {
		account: userData.res,
		posts: personPosts.res.posts,
		subs: userSubs.res,
		//balances: balances,
		//verification: verification
	}

	yield put({ type: 'SET_USER', data: { [address]: userObject } })
}
