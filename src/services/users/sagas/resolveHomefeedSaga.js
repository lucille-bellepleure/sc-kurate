import { all, call, put, select, fork } from 'redux-saga/effects'
import resolvePostSaga from '../../postState/sagas/resolvePostSaga'
import { getAccount } from '../../account/selectors'
import { resPost } from '../../postState/actions'
import fetchSubscriberSaga from './fetchSubscriberSaga'
import { setFeed, getFeed, uploadData } from 'helpers/swarmFeed'

export default function* resolveHomefeedSaga(action) {
	console.log('Resolve Posts Saga')

	let initialState = {
		posts: {},
	}

	// Resolve me
	const account = yield select(getAccount)
	const userData = yield getFeed('userdata', account.address)
	const personPosts = yield getFeed('userposts', account.address)
	const postsArray = Object.keys(personPosts.res.posts)

	const personSubs = yield getFeed('usersubscriptions', account.address)
	const personSubsArray = Object.keys(personSubs.res)

	yield all(personSubsArray.map((p) => call(fetchSubscriberSaga, { address: p })))
	yield all(
		postsArray.map((x) =>
			call(resolvePostSaga, { postId: x, userAddress: account.address, serial: personPosts.res.posts[x].nft })
		)
	)

	yield put({ type: 'SET_HOMEFEED', data: personPosts.res.posts })

	let userObject = {
		subscriptions: personSubs.res,
	}

	yield put({ type: 'SET_ACCOUNT', data: userObject })
}
