
import { takeEvery } from "redux-saga/effects";
import * as t from "./actionTypes";
// Sagas
import resolveUserSaga from "./sagas/resolveUserSaga"

/******************************* Watchers *************************************/

export default function* resolveUserRootSaga() {
    //yield resolveMyPostsSaga()
    yield takeEvery(t.GET_USER, resolveUserSaga);
}
