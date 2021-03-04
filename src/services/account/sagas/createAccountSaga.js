import { delay, put, select, fork } from "redux-saga/effects"
import { setFeed, getFeed } from "helpers/swarmFeed"

export default function* createAccountSaga(
    action
) {
    console.log("CreateAccount Saga", action.data)
    const userObject = action.data;

    const encryptedPrivateKey = window.myWeb3.eth.accounts.encrypt(userObject.privateKey, userObject.password);

    // Here we set the user data object to a feed

    try {
        const refUser = yield setFeed('userdata', {
            username: userObject.username,
            useravatar: userObject.avatar,
            publicKey: userObject.publicKey,
            address: userObject.address
        }, userObject.privateKey)
    } catch (error) {
        console.error(error)
    }

    // Here we create an empty userPosts feed

    try {
        const refPosts = yield setFeed('userposts', { posts: {} }, userObject.privateKey)
    } catch (error) {
        console.error(error)
    }

    // Here we create empty userSubs feed

    try {
        const refSubs = yield setFeed('usersubscriptions',
            {},
            userObject.privateKey)
    } catch (error) {
        console.error(error)
    }

    const accountObj = {
        address: userObject.address,
        avatar: userObject.avatar,
        username: userObject.username,
        status: 'accountSet',
        mnemonic: null,
        privateKey: encryptedPrivateKey,
        publicKey: userObject.publicKey,
        subscriptions: {}
    }

    console.log(accountObj);

    yield put({ type: "SET_ACCOUNT", data: accountObj })
}