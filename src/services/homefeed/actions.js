import * as t from "./actionTypes"

export const setLike = data => ({
    type: t.SET_LIKE,
    data
})

export const setPosts = data => ({
    type: t.SET_POSTS,
    data
})

export const resolveMyPosts = data => ({
    type: t.RESOLVE_MYPOSTS,
    data
})