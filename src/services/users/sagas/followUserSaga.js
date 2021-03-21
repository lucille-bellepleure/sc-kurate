import { call, delay, put, select, fork } from "redux-saga/effects"
import { getAccount } from "services/account/selectors"
import { setFeed, getFeed, downloadData, uploadData } from "helpers/swarmFeed"

export default function* followUserSaga(
    action
) {
    console.log('follow u ser saga', action.data)
    const account = yield select(getAccount)
    const decryptedPrivateKey = window.myWeb3.eth.accounts.decrypt(account.privateKey, action.data.password);
    console.log(decryptedPrivateKey.address, decryptedPrivateKey.privateKey)

    const currentSubs = action.data.currentSubs
    const addressToFollow = action.data.address

    currentSubs[addressToFollow] = {}

    const newFollowing = yield setFeed(
        'usersubscriptions',
        currentSubs,
        decryptedPrivateKey.privateKey
    )

    yield put({ type: "RESOLVE_ACCOUNT" })

}