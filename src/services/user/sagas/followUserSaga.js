import { call, delay, put, select, fork } from "redux-saga/effects"
import { getAccount } from "services/account/selectors"

export default function* followUserSaga(
    action
) {
    console.log('follow u ser saga', action.data)
    const account = yield select(getAccount)
    const decryptedPrivateKey = window.myWeb3.eth.accounts.decrypt(account.privateKey, '1234');
    console.log(decryptedPrivateKey.address, decryptedPrivateKey.privateKey)

    const currentSubs = action.data.currentSubs
    const addressToFollow = action.data.address

    currentSubs[addressToFollow] = {}

    const newFollowing = yield window.fds.Account.SwarmStore.SF.set(
        decryptedPrivateKey.address,
        'usersubscriptions',
        decryptedPrivateKey.privateKey,
        currentSubs
    )

    const userObject = {
        subs: currentSubs
    }

    yield put({ type: "SET_ACCOUNT", data: userObject })


}