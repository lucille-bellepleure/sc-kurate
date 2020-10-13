
export default async function fetchMyPosts({ address }) {
    const personRawPosts = await window.fds.Account.SwarmStore.SF.get(address, 'userposts');
    const personPosts = JSON.parse(personRawPosts)
    const personRawAccount = await window.fds.Account.SwarmStore.SF.get(address, 'userdata');
    const personAccount = JSON.parse(personRawAccount)
    const postsArray = Object.keys(personPosts.posts)
    const res = {}

    await Promise.all(
        postsArray.map(async post => {
            console.log(post)
            //const { rawRes, error } = useSWR(post, fetcher);
            //console.log({ rawRes, error })
            const rawRes = await window.fds.Account.Store.sendRequest("https://swarm-gateways.net/bzz:/" + post + "/, 'GET', 'text'");
            const result = JSON.parse(rawRes);
            const thisPost = {}
            thisPost._id = result.time;
            thisPost.image = result.image;
            thisPost.time = result.time;
            thisPost.avatar = personAccount.useravatar;
            thisPost.username = personAccount.username;
            thisPost.address = personAccount.address;
            thisPost.likes = 0;
            thisPost.location = "Unknown";
            thisPost.type = "post";
            thisPost.format = "image";
            thisPost.caption = result.caption;
            res[post] = thisPost;
        })
    );
    return res;
}


