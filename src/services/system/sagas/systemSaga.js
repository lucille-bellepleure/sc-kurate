import { call, put, select, fork } from 'redux-saga/effects'

function delay(duration) {
	const promise = new Promise((resolve) => {
		setTimeout(() => resolve(true), duration)
	})
	return promise
}

export default function* systemSaga() {
	console.log('system saga started')
	while (true) {
		try {
			console.log('Getting homefeed - ', Date.now().toISOString())
			yield put({ type: 'RES_HOMEFEED' })
			yield call(delay, 3000)
		} catch (e) {
			console.log('error on timeout')
		}
	}
}
