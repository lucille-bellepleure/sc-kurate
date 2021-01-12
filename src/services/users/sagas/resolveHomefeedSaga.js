import { all, call, put, select, fork } from "redux-saga/effects"
import resolvePostSaga from "../../postState/sagas/resolvePostSaga"
import { getAccount } from "../../account/selectors"
import { resPost } from "../../postState/actions"
import fetchSubscriberSaga from "./fetchSubscriberSaga"


export default function* resolveHomefeedSaga(
    action
) {
    console.log("Resolve Posts Saga", action.data)

    let initialState = {
        posts: {},
    };

    //yield put({ type: "SET_HOMEFEED", data: initialState })

    // Resolve me
    debugger

    const account = yield select(getAccount)
    console.log(account)
    const decryptedPrivateKey = window.myWeb3.eth.accounts.decrypt(account.privateKey, '1234');
    console.log(decryptedPrivateKey)
    const userDataRaw = yield window.fds.Account.SwarmStore.SF.get(account.address, 'userdata', decryptedPrivateKey.privateKey);
    const userData = JSON.parse(userDataRaw)

    const personRawPosts = yield window.fds.Account.SwarmStore.SF.get(account.address, 'userposts', decryptedPrivateKey.privateKey);
    const personPosts = JSON.parse(personRawPosts)
    const postsArray = Object.keys(personPosts.posts)

    const personRawSubs = yield window.fds.Account.SwarmStore.SF.get(account.address, 'usersubscriptions', decryptedPrivateKey.privateKey);
    const personSubs = JSON.parse(personRawSubs)
    const personSubsArray = Object.keys(personSubs)

    console.log(personSubsArray)

    yield all(personSubsArray.map(p =>
        call(fetchSubscriberSaga, { address: p })
    ))

    yield all(postsArray.map(x => call(resolvePostSaga, { postId: x, userAddress: account.address })))

    yield put({ type: "SET_HOMEFEED", data: personPosts.posts })
    // let userObject = {
    //     account: userData
    // }

    // yield put({ type: "SET_USER", data: userObject })

    // console.log(userData)


    // Resolve posts
    // const userPosts = yield call(fetchPosts, { address })
    // console.log(userPosts)

    // userObject = {
    //     posts: userPosts,
    // }

    // yield put({ type: "SET_USER", data: userObject })


    // Resolve user's subscriptions
    // const userSubsRaw = yield window.fds.Account.SwarmStore.SF.get(address, 'usersubscriptions');
    // const userSubs = JSON.parse(userSubsRaw)
    // console.log('Subscriptions: ', userSubs)
    // const userSubsArray = Object.keys(userSubs)
    // for (let index = 0; index < userSubsArray.length; index++) {
    //     const sub = userSubsArray[index];
    //     const subAccountRaw = yield window.fds.Account.SwarmStore.SF.get(sub, 'userdata')
    //     const subAccount = JSON.parse(subAccountRaw)
    //     userSubs[sub].avatar = subAccount.useravatar;
    //     userSubs[sub].username = subAccount.username;
    //     userSubs[sub].address = subAccount.address;
    //     console.log(userSubs[sub])
    // }

    // userObject = {
    //     subs: userSubs
    // }

    // yield put({ type: "SET_USER", data: userObject })
}