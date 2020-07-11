import { all, call, delay, put, select, fork } from "redux-saga/effects"
import resolvePostSaga from "../../postState/sagas/resolvePostSaga"

export default function* fetchSubscriberSaga(
    action
) {
    console.log("Fetch Subscribers Posts Saga", action)

    let initialState = {
        posts: {},
    };

    // Resolve subscriber
    const userDataRaw = yield window.fds.Account.SwarmStore.SF.get(action.address, 'userdata');
    const userData = JSON.parse(userDataRaw)
    const personRawPosts = yield window.fds.Account.SwarmStore.SF.get(action.address, 'userposts');
    const personPosts = JSON.parse(personRawPosts)
    const postsArray = Object.keys(personPosts.posts)

    yield all(postsArray.map(x => call(resolvePostSaga, { postId: x, userAddress: action.address })))

    yield put({ type: "SET_HOMEFEED", data: personPosts.posts })

}