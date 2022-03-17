import { delay, put, select, fork } from 'redux-saga/effects'
import { setFeed, getFeed, downloadData, uploadData } from 'helpers/swarmFeed'
import { getAccount } from '../../account/selectors'

export default function* resolveAccountSaga(action) {
	console.log('Resolve account', action.data)
	const account = yield select(getAccount)

	let subscribers = yield getFeed('usersubscriptions', account.address)
	console.log(subscribers)
	let accountObj = {
		subscribers: subscribers.res,
	}

	yield put({ type: 'SET_ACCOUNT', data: accountObj })
}
