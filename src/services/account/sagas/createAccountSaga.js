import { delay, put, select, fork } from "redux-saga/effects"
import createSwarmFeed from "helpers/createSwarmFeed"

export default function* createAccountSaga(
    action
) {
    console.log("CreateAccount Saga", action.data)
    const userObject = action.data;
    console.log(userObject);

    const encryptedPrivateKey = window.myWeb3.eth.accounts.encrypt(userObject.privateKey, userObject.password);

    console.log(encryptedPrivateKey);

    const swarmUser = yield window.fds.Account.SwarmStore.SF.set(
        userObject.address,
        'userdata',
        userObject.privateKey,
        {
            username: userObject.username,
            useravatar: userObject.avatar,
            publicKey: userObject.publicKey,
            address: userObject.address
        })

    console.log(swarmUser);

    const firstPost = yield window.fds.Account.SwarmStore.SF.set(
        userObject.address,
        'userposts',
        userObject.privateKey,
        {
            posts: []
        })

    const accountObj = {
        address: userObject.address,
        avatar: userObject.avatar,
        username: userObject.username,
        status: 'accountSet',
        mnemonic: null,
        privateKey: encryptedPrivateKey,
        publicKey: userObject.publicKey
    }

    console.log(accountObj);

    yield put({ type: "SET_ACCOUNT", data: accountObj })
}