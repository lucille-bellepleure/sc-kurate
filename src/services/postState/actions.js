import * as t from './actionTypes'

export const addPost = (data) => ({
	type: t.ADD_POST,
	data,
})

export const delPost = (data) => ({
	type: t.DEL_POST,
	data,
})

export const resPost = (data) => ({
	type: t.RES_POST,
	data,
})
