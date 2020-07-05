
import { takeEvery } from "redux-saga/effects";
import * as t from "./actionTypes";
// Sagas
import resolveUserSaga from "./sagas/resolveUserSaga"
import followUserSaga from "./sagas/followUserSaga"

/******************************* Watchers *************************************/

export default function* resolveUserRootSaga() {
    //yield resolveMyPostsSaga()
    yield takeEvery(t.GET_USER, resolveUserSaga);
    yield takeEvery(t.FOLLOW_USER, followUserSaga);
}
