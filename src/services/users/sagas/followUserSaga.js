import { call, delay, put, select, fork } from "redux-saga/effects"
import { getAccount } from "services/account/selectors"
import { setFeed, getFeed, downloadData, uploadData } from "helpers/swarmFeed"

export default function* followUserSaga(
    action
) {
    debugger
    console.log('follow u ser saga', action.data)
    const account = yield select(getAccount)
    const decryptedPrivateKey = window.myWeb3.eth.accounts.decrypt(account.privateKey, '1234');
    console.log(decryptedPrivateKey.address, decryptedPrivateKey.privateKey)

    const currentSubs = action.data.currentSubs
    const addressToFollow = action.data.address

    currentSubs.subscriptions[addressToFollow] = {}

    const newFollowing = yield setFeed(
        'usersubscriptions',
        currentSubs,
        decryptedPrivateKey.privateKey
    )

    const userObject = {
        subs: currentSubs
    }

    yield put({ type: "SET_ACCOUNT", data: userObject })


}