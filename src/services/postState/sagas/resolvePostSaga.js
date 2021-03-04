import { call, delay, put, select, fork } from "redux-saga/effects"
import { getAccount } from "services/account/selectors"
import * as s from "../selectors"
import { setFeed, getFeed, downloadData, uploadData } from "helpers/swarmFeed"

export default function* resolvePostSaga(
    action
) {
    console.log("Resolve Post Saga", action)
    // Temp get private key 

    const account = yield select(getAccount)
    console.log(account)
    //const decryptedPrivateKey = window.myWeb3.eth.accounts.decrypt(account.privateKey, '1234');
    //console.log(decryptedPrivateKey.address, decryptedPrivateKey.privateKey)

    // First resolve my posts
    const postId = action.postId
    const userAddress = action.userAddress

    const cachedPosts = yield select(s.getPostState)
    console.log(cachedPosts)

    if (!cachedPosts[postId]) {
        const thisPost = yield downloadData(postId);
        const userData = yield getFeed('userdata', userAddress);
        //const userData = JSON.parse(userDataRaw)
        console.log(userData)
        thisPost._id = thisPost.time;
        thisPost.avatar = userData.useravatar;
        thisPost.username = userData.username;
        thisPost.address = userData.address;
        thisPost.likes = 0;
        thisPost.location = "Unknown";
        thisPost.type = "post";
        thisPost.format = "image";
        yield put({ type: "ADD_POST", data: { [postId]: thisPost } })
    } else {
        console.log("Post in cache")
    }
}