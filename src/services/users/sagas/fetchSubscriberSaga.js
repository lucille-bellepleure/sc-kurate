import { all, call, delay, put, select, fork } from "redux-saga/effects"
import resolvePostSaga from "../../postState/sagas/resolvePostSaga"
import { getAccount } from "services/account/selectors"

export default function* fetchSubscriberSaga(
    action
) {
    console.log("Fetch Subscribers Posts Saga", action)

    let initialState = {
        posts: {},
    };

    // Resolve subscriber
    const account = yield select(getAccount)
    console.log(account)
    const decryptedPrivateKey = window.myWeb3.eth.accounts.decrypt(account.privateKey, '1234');
    console.log(decryptedPrivateKey.address, decryptedPrivateKey.privateKey)

    const userDataRaw = yield window.fds.Account.SwarmStore.SF.get(action.address, 'userdata');
    const userData = JSON.parse(userDataRaw)
    const personRawPosts = yield window.fds.Account.SwarmStore.SF.get(action.address, 'userposts');
    const personPosts = JSON.parse(personRawPosts)
    const postsArray = Object.keys(personPosts.posts)

    yield all(postsArray.map(x => call(resolvePostSaga, { postId: x, userAddress: action.address })))

    yield put({ type: "SET_HOMEFEED", data: personPosts.posts })

}