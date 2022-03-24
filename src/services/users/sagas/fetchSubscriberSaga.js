import { all, call, put } from 'redux-saga/effects'
import resolvePostSaga from '../../postState/sagas/resolvePostSaga'
import { getFeed } from 'helpers/swarmFeed'

export default function* fetchSubscriberSaga(action) {
	console.log('Fetch Subscribers Posts Saga', action)

	// Resolve subscriber
	// const account = yield select(getAccount)

	const personPosts = yield getFeed('userposts', action.address)

	const postsArray = Object.keys(personPosts.res.posts)

	yield all(postsArray.map((x) => call(resolvePostSaga, {data: { postId: x, userAddress: action.address }})))

	yield put({ type: 'SET_HOMEFEED', data: personPosts.res.posts })
}
