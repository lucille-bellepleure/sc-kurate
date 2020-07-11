
import { takeEvery } from "redux-saga/effects";
import * as t from "./actionTypes";
// Sagas
import resolvePostSaga from "./sagas/resolvePostSaga"

/******************************* Watchers *************************************/

export default function* postStateRootSaga() {
    //yield resolveMyPostsSaga()
    yield takeEvery(t.RES_POST, resolvePostSaga);
}
