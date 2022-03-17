import * as t from './sagas/actionTypes'

export const setUser = (data) => ({
	type: t.SET_USER,
	data,
})

export const getUser = (data) => ({
	type: t.GET_USER,
	data,
})

export const followUser = (data) => ({
	type: t.FOLLOW_USER,
	data,
})

export const unfollowUser = (data) => ({
	type: t.UNFOLLOW_USER,
	data,
})

export const resHomefeed = (data) => ({
	type: t.RES_HOMEFEED,
	data,
})
