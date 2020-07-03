import { call, delay, put, select, fork } from "redux-saga/effects"
import { getAccount } from "services/account/selectors"
import fetchMyPosts from "../fetchFunctions/fetchMyPosts.js"
export default function* resolveMyPostsSaga(
    action
) {
    console.log("Resolve Posts Saga", action.data)
    // Temp get private key 
    const account = yield select(getAccount)
    const decryptedPrivateKey = window.myWeb3.eth.accounts.decrypt(account.privateKey, '1234');
    console.log(decryptedPrivateKey.address, decryptedPrivateKey.privateKey)

    // First resolve my posts
    const address = action.data
    const myPosts = yield call(fetchMyPosts, { address })
    yield put({ type: "SET_POSTS", data: myPosts })
    // Then resolve the posts of the people I follow
    try {
        const mySubscriptionsRaw = yield window.fds.Account.SwarmStore.SF.get(address, 'usersubscriptions');
        const mySubscriptions = JSON.parse(mySubscriptionsRaw)
        const subscriptionsArray = Object.keys(mySubscriptions)
        for (let index = 0; index < subscriptionsArray.length; index++) {
            const subscription = subscriptionsArray[index];
            const theirPosts = yield call(fetchMyPosts, { address: subscription })
            yield put({ type: "SET_POSTS", data: theirPosts })
        }
    } catch (error) {
        console.error(error)
    }

}