export async function sharePost(dataObject) {
    console.log("Share Post Saga", dataObject)
    const postObject = dataObject;
    const userObject = dataObject.user;
    let decryptedPrivateKey
    try {
        decryptedPrivateKey = window.myWeb3.eth.accounts.decrypt(dataObject.user.privateKey, dataObject.password);

    } catch (error) {
        console.log(error)
    }

    console.log(decryptedPrivateKey.privateKey);

    const storedPost = await window.fds.Account.Store.postData(postObject.post)

    console.log(storedPost)

    try {
        const oldPost = await window.fds.Account.SwarmStore.SF.get(userObject.address, 'userposts');
        let tempPosts = JSON.parse(oldPost);
        let time = new Date().toISOString();
        tempPosts.posts[storedPost] = { time: time, bzz: storedPost }
        await window.fds.Account.SwarmStore.SF.set(
            userObject.address,
            'userposts',
            decryptedPrivateKey.privateKey,
            tempPosts
        )
        //yield put({ type: 'SET_SYSTEM', data: { passWord: null } })
        //yield put({ type: "RES_HOMEFEED" })
    } catch (error) {
        console.log('ERR', error.message)
    }
    return true
}