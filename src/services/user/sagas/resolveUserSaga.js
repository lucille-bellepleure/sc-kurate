import { call, delay, put, select, fork } from "redux-saga/effects"
import fetchPosts from "../fetchFunctions/fetchPosts.js"

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

    yield put({ type: "SET_USER", data: initialState })

    const address = action.data

    // Resolve user
    const userDataRaw = yield window.fds.Account.SwarmStore.SF.get(address, 'userdata');
    const userData = JSON.parse(userDataRaw)

    let userObject = {
        account: userData
    }

    yield put({ type: "SET_USER", data: userObject })

    console.log(userData)


    // Resolve posts
    const userPosts = yield call(fetchPosts, { address })
    console.log(userPosts)

    userObject = {
        posts: userPosts,
    }

    yield put({ type: "SET_USER", data: userObject })


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

    userObject = {
        subs: userSubs
    }

    yield put({ type: "SET_USER", data: userObject })
}