import { all, call, put, select, fork } from "redux-saga/effects"
import resolvePostSaga from "../../postState/sagas/resolvePostSaga"
import { getAccount } from "../../account/selectors"
import { resPost } from "../../postState/actions"
import fetchSubscriberSaga from "./fetchSubscriberSaga"
import { setFeed, getFeed, uploadData } from "helpers/swarmFeed"


export default function* resolveHomefeedSaga(
    action
) {
    console.log("Resolve Posts Saga")

    let initialState = {
        posts: {},
    };

    //yield put({ type: "SET_HOMEFEED", data: initialState })

    // Resolve me
    const account = yield select(getAccount)
    // console.log('User Address: ', account.address)
    // const decryptedPrivateKey = window.myWeb3.eth.accounts.decrypt(account.privateKey, '1234');
    // console.log('User PrivateKey: ', decryptedPrivateKey.privateKey)

    const userData = yield getFeed('userdata', account.address);
    //const userData = JSON.parse(userDataRaw)

    const personPosts = yield getFeed('userposts', account.address);
    //const personPosts = JSON.parse(personRawPosts)
    console.log(personPosts)

    const postsArray = Object.keys(personPosts.posts)
    const personSubs = yield getFeed('usersubscriptions', account.address);
    //const personSubs = JSON.parse(personRawSubs)
    const personSubsArray = Object.keys(personSubs)

    console.log(personSubsArray)

    yield all(personSubsArray.map(p =>
        call(fetchSubscriberSaga, { address: p })
    ))

    yield all(postsArray.map(x => call(resolvePostSaga,  { postId: x, userAddress: account.address })))

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

    let userObject = {
        subscriptions: personSubs
    }

    yield put({ type: "SET_ACCOUNT", data: userObject })
}