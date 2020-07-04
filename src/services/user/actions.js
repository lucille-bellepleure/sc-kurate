import * as t from "./sagas/actionTypes"

export const setUser = data => ({
    type: t.SET_USER,
    data
})

export const getUser = data => ({
    type: t.GET_USER,
    data
})