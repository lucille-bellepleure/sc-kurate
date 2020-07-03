import { delay, put, select, fork } from "redux-saga/effects"
import { getAccount } from "services/account/selectors"

export default function* resolveMyPostsSaga(
    action
) {
    console.log("Resolve My Posts Saga")
    const account = yield select(getAccount)
    //teddy: 0x77bccEca32B318e4bb2AbabFD9447236C66c3FD6
    //danny: 0xe899F21F4C941F0DeE53CB0441436Db93CE67787
    // now resolve the posts one by one plz
    const imFollowing = [
        { address: "0x77bccEca32B318e4bb2AbabFD9447236C66c3FD6" },
        { address: "0xe899F21F4C941F0DeE53CB0441436Db93CE67787" },
        { address: "0x02a26e55693b661e30079fb929F7406E300C0c9C" },
        { address: "0xF687A6EEc1E37345727d737D43A120a8B4f1DE5b" }
    ]

    if (account.address) {
        imFollowing.push({ address: account.address })
    }

    for (let index = 0; index < imFollowing.length; index++) {
        const person = imFollowing[index];
        const personRawAccount = yield window.fds.Account.SwarmStore.SF.get(person.address, 'userdata');
        const personAccount = JSON.parse(personRawAccount);
        const personRawPosts = yield window.fds.Account.SwarmStore.SF.get(person.address, 'userposts');
        const personPosts = JSON.parse(personRawPosts)

        for (let index = 0; index < personPosts.posts.length; index++) {
            try {
                const post = personPosts.posts[index];
                console.log(post.bzz)
                let rawPost = yield window.fds.Account.Store.sendRequest("https://swarm-gateways.net/bzz:/" + post.bzz + "/, 'GET', 'text'")
                let thisPost = JSON.parse(rawPost)
                // create the post 
                thisPost._id = post.time;
                thisPost.format = 'image';
                thisPost.description = thisPost.caption;
                thisPost.likes = 0;
                thisPost.location = "Antwerp";
                thisPost.type = "post";
                thisPost.user = personAccount.username;
                thisPost.avatar = personAccount.useravatar;
                console.log(thisPost)
                yield put({ type: "ADD_POST", data: thisPost })
            } catch (error) {
                console.error(error)
            }
        }

    }



    //yield put({ type: "SET_ACCOUNT", data: accountObj })
}