import { delay, put, select, fork } from "redux-saga/effects"

export default function* sharePostSaga(
    action
) {
    console.log("Share Post Saga", action.data)
    const postObject = action.data;
    const userObject = action.data.user;

    const decryptedPrivateKey = window.myWeb3.eth.accounts.decrypt(action.data.user.privateKey, postObject.password);

    console.log(decryptedPrivateKey.privateKey);

    const storedPost = yield window.fds.Account.Store.postData(postObject.post)

    console.log(storedPost)

    try {
        const oldPost = yield window.fds.Account.SwarmStore.SF.get(userObject.address, 'userposts');
        let tempPosts = JSON.parse(oldPost);
        let time = new Date().toISOString();
        tempPosts.posts[storedPost] = { time: time, bzz: storedPost }
        yield window.fds.Account.SwarmStore.SF.set(
            userObject.address,
            'userposts',
            decryptedPrivateKey.privateKey,
            tempPosts
        )
        yield put({ type: 'SET_SYSTEM', data: { passWord: null } })
    } catch (error) {
        console.log('ERR', error.message)
    }






    //yield put({ type: "SET_ACCOUNT", data: accountObj })
}