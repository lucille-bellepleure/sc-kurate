import * as t from "./actionTypes"

export const setLike = data => ({
    type: t.SET_LIKE,
    data
})

export const addPost = data => ({
    type: t.ADD_POST,
    data
})

export const resolveMyPosts = data => ({
    type: t.RESOLVE_MYPOSTS,
    data
})