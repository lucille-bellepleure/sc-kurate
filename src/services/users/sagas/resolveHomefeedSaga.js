import { all, call, put, select } from 'redux-saga/effects'
import resolvePostSaga from '../../postState/sagas/resolvePostSaga'
import { getAccount } from '../../account/selectors'
import fetchSubscriberSaga from './fetchSubscriberSaga'
import { getFeed } from 'helpers/swarmFeed'

export default function* resolveHomefeedSaga() {
	console.log('Resolve Posts Saga')

	// Resolve me
	const account = yield select(getAccount)
	if(account.address){
		const personData = yield getFeed('userdata', account.address)

		let personObject = {
			username: personData.res.username,
			avatar: personData.res.useravatar
		}
		
		yield put({ type: 'SET_ACCOUNT', data: personObject })

			const personPosts = yield getFeed('userposts', account.address)
		const postsArray = Object.keys(personPosts.res.posts)
		
		const personSubs = yield getFeed('usersubscriptions', account.address)
		const personSubsArray = Object.keys(personSubs.res)

		yield all(personSubsArray.map((p) => call(fetchSubscriberSaga, { address: p })))
		yield all(
			postsArray.map((x) =>
				call(resolvePostSaga, {data: { postId: x, userAddress: account.address, serial: personPosts.res.posts[x].nft }})
			)
		)

		yield put({ type: 'SET_HOMEFEED', data: personPosts.res.posts })

		let userObject = {
			subscriptions: personSubs.res,
		}

		yield put({ type: 'SET_ACCOUNT', data: userObject })
	} else {
		const personSubsArray = Object.keys(account.subscriptions)
		yield all(personSubsArray.map((p) => call(fetchSubscriberSaga, { address: p })))

	}
}
