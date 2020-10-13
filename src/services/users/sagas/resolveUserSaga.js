import { all, call, delay, put, select, fork } from "redux-saga/effects"
import fetchPosts from "../fetchFunctions/fetchPosts.js"
import resolvePostSaga from "../../postState/sagas/resolvePostSaga"
import * as s from "../selectors"

export default function* resolveUserSaga(
    action
) {
    console.log("Resolve Posts Saga", action.data)

    let initialState = {
        account:
            { username: "fetching" },
        posts: {},
        subs: {}
    };

    const address = action.data

    const cachedUsers = yield select(s.getUsers)

    // Resolve user
    const userDataRaw = yield window.fds.Account.SwarmStore.SF.get(address, 'userdata');
    const userData = JSON.parse(userDataRaw)



    // Resolve posts
    const personRawPosts = yield window.fds.Account.SwarmStore.SF.get(address, 'userposts');
    const personPosts = JSON.parse(personRawPosts)
    const postsArray = Object.keys(personPosts.posts)


    yield all(postsArray.map(x => call(resolvePostSaga, { postId: x, userAddress: address })))

    // Resolve user's subscriptions
    const userSubsRaw = yield window.fds.Account.SwarmStore.SF.get(address, 'usersubscriptions');
    const userSubs = JSON.parse(userSubsRaw)
    console.log('Subscriptions: ', userSubs)
    const userSubsArray = Object.keys(userSubs)
    for (let index = 0; index < userSubsArray.length; index++) {
        const sub = userSubsArray[index];
        const subAccountRaw = yield window.fds.Account.SwarmStore.SF.get(sub, 'userdata')
        const subAccount = JSON.parse(subAccountRaw)
        userSubs[sub].avatar = subAccount.useravatar;
        userSubs[sub].username = subAccount.username;
        userSubs[sub].address = subAccount.address;
        console.log(userSubs[sub])
    }

    const userObject = {
        account: userData,
        posts: personPosts.posts,
        subs: userSubs
    }

    yield put({ type: "SET_USER", data: { [address]: userObject } })
}