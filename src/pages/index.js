import AccountCreateRoot from "./account-create/AccountCreateRoot"
import AccountRoot from "./account/AccountRoot"
import PostItemRoot from "./post-item/PostItemRoot"
import HomeFeedRoot from "./home-feed/HomeFeedRoot"
import UserRoot from "./user/UserRoot"
import PostDetail from "./user/pages/PostDetail"
import AboutRoot from "./about/AboutRoot"
import VerifyRoot from "./verify/VerifyRoot"

export default [
    { path: "/home", exact: true, component: HomeFeedRoot },
    { path: "/", exact: true, component: AboutRoot },
    { path: "/post-item", exact: true, component: PostItemRoot },
    { path: "/create-account", exact: true, component: AccountCreateRoot },
    { path: "/account", exact: true, component: AccountRoot },
    { path: "/user/:userAddress", component: UserRoot },
    { path: "/post/:bzzPost/:userAddress", component: PostDetail },
    { path: "/verify/:shortcode", component: VerifyRoot }
]