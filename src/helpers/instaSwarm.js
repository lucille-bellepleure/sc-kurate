export default async function storePost(dataObject) {
    const postObject = dataObject;
    const userObject = dataObject.user;
    let decryptedPrivateKey
    try {
        decryptedPrivateKey = window.myWeb3.eth.accounts.decrypt(userObject.privateKey, dataObject.password);

    } catch (error) {
        console.log(error)
    }

    const storedPost = await window.fds.Account.Store.postData(postObject.post)

    try {
        const oldPost = await window.fds.Account.SwarmStore.SF.get(userObject.address, 'userposts', decryptedPrivateKey.privateKey);
        let tempPosts = JSON.parse(oldPost);
        let time = new Date().toISOString();
        tempPosts.posts[storedPost] = { time: time, bzz: storedPost }
        await window.fds.Account.SwarmStore.SF.set(
            userObject.address,
            'userposts',
            decryptedPrivateKey.privateKey,
            tempPosts
        )
        return true
    } catch (error) {
        console.log('ERR', error.message)
        return error
    }
}