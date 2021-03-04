import { setFeed, getFeed, uploadData } from "helpers/swarmFeed"

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

export default async function storePost(dataObject) {

    const postObject = dataObject;
    const userObject = dataObject.user;
    let decryptedPrivateKey
    try {
        decryptedPrivateKey = window.myWeb3.eth.accounts.decrypt(userObject.privateKey, dataObject.password);

    } catch (error) {
        console.log(error)
    }
    debugger

    const storedPost = await uploadData(postObject.post)
    console.log('Stored posts', storedPost)


    try {
        var oldPosts = await getFeed('userposts', userObject.address);
        //let tempPosts = JSON.parse(oldPost);

        console.log('oldPosts: ', oldPosts)

        let time = new Date().toISOString();
        oldPosts.posts[storedPost] = { time: time, bzz: storedPost }
        //let stringedPosts = JSON.stringify(newPosts)

        await setFeed(
            'userposts',
            oldPosts,
            decryptedPrivateKey.privateKey
        )
        return true
    } catch (error) {
        console.log('ERR', error.message)
        return error
    }
}