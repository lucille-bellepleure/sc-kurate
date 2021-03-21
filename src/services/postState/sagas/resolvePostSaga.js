import { call, delay, put, select, fork } from "redux-saga/effects"
import { getAccount } from "services/account/selectors"
import * as s from "../selectors"
import { setFeed, getFeed, downloadData, uploadData } from "helpers/swarmFeed"

window.getFeed = getFeed
window.setFeed = setFeed

export default function* resolvePostSaga(
    action
) {

    console.log("Resolve Post Saga", action)

    const account = yield select(getAccount)

    // First resolve my posts
    const postId = action.postId
    const userAddress = action.userAddress

    const cachedPosts = yield select(s.getPostState)
    console.log(cachedPosts)

    if (!cachedPosts[postId]) {
        const thisPost = yield downloadData(postId);
        const userData = yield getFeed('userdata', userAddress);
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