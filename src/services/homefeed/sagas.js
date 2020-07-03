
import { takeEvery } from "redux-saga/effects";
import * as t from "./actionTypes";
// Sagas
import resolveMyPostsSaga from "./sagas/resolveMyPostsSaga"

/******************************* Watchers *************************************/

export default function* homefeedRootSaga() {
    //yield resolveMyPostsSaga()
    yield takeEvery(t.RESOLVE_MYPOSTS, resolveMyPostsSaga);
}
