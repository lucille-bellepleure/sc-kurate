import AccountCreateRoot from "./account-create/AccountCreateRoot"
import PostItemRoot from "./post-item/PostItemRoot"
import HomeFeedRoot from "./home-feed/HomeFeedRoot"

export default [
    { path: "/", exact: true, component: HomeFeedRoot },
    { path: "/post-item", exact: true, component: PostItemRoot },
    { path: "/create-account", exact: true, component: AccountCreateRoot },

]