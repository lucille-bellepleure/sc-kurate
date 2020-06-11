
import { takeEvery } from "redux-saga/effects";
import * as t from "./actionTypes";
// Sagas
import createAccountSaga from "./sagas/createAccountSaga"
import createMnemonicSaga from "./sagas/createMnemonicSaga"

/******************************* Watchers *************************************/

export default function* accountRootSaga() {
    yield takeEvery(t.CREATE_ACCOUNT, createAccountSaga);
    yield takeEvery(t.CREATE_MNEMONIC, createMnemonicSaga);
}
