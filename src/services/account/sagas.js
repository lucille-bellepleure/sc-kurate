
import { takeEvery } from "redux-saga/effects";
import * as t from "./actionTypes";
// Sagas
import createAccountSaga from "./sagas/createAccountSaga"
import createMnemonicSaga from "./sagas/createMnemonicSaga"
import createShortCodeSaga from "./sagas/createShortCodeSaga"
import resolveShortCodeSaga from "./sagas/resolveShortCodeSaga"

/******************************* Watchers *************************************/

export default function* accountRootSaga() {
    yield takeEvery(t.CREATE_ACCOUNT, createAccountSaga);
    yield takeEvery(t.CREATE_MNEMONIC, createMnemonicSaga);
    yield takeEvery(t.CREATE_SHORTCODE, createShortCodeSaga);
    yield takeEvery(t.RESOLVE_SHORTCODE, resolveShortCodeSaga);
}
