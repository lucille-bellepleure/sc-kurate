import * as t from './actionTypes'
import { persistentReducer } from 'redux-pouchdb-plus'

// Service > user

const initialState = {}

function users(state = initialState, action) {
	switch (action.type) {
		case t.SET_USER:
			return {
				...state,
				...action.data,
			}

		default:
			return state
	}
}

const usersPersist = persistentReducer(users, {
	users,
})

export default users
