import { takeEvery } from 'redux-saga/effects'
import * as t from './actionTypes'
// Sagas
import sharePostSaga from './sagas/sharePostSaga'

/******************************* Watchers *************************************/

export default function* postItemRootSaga() {
	yield takeEvery(t.SHARE_POST, sharePostSaga)
}
