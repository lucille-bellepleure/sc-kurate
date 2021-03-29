import { all, call, delay, put, select, fork } from "redux-saga/effects"
import fetchPosts from "../fetchFunctions/fetchPosts.js"
import resolvePostSaga from "../../postState/sagas/resolvePostSaga"
import * as s from "../selectors"
import { setFeed, getFeed, downloadData, uploadData } from "helpers/swarmFeed"
import * as h from "helpers/instaSwarm"

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
    const userData = yield getFeed('userdata', address);

    const balances = yield h.fetchBalance(address);

    // Resolve posts
    const personPosts = yield getFeed('userposts', address);
    const postsArray = Object.keys(personPosts.posts)

    yield all(postsArray.map(x => call(resolvePostSaga, { data: {postId: x, userAddress: address} })))

    // Resolve user's subscriptions
    const userSubs = yield getFeed('usersubscriptions', address);
    console.log('Subscriptions: ', userSubs)
    const userSubsArray = Object.keys(userSubs)
    for (let index = 0; index < userSubsArray.length; index++) {
        const sub = userSubsArray[index];
        const subAccount = yield getFeed('userdata', sub)
        userSubs[sub].avatar = subAccount.useravatar;
        userSubs[sub].username = subAccount.username;
        userSubs[sub].address = subAccount.address;
        console.log(userSubs[sub])
    }

    const userObject = {
        account: userData,
        posts: personPosts.posts,
        subs: userSubs,
        balances: balances
    }

    yield put({ type: "SET_USER", data: { [address]: userObject } })
}