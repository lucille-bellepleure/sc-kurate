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

//persistentReducer(users, { users })

//export default users


const usersPersisted = persistentReducer(users, {
	name: 'users',
})

export default usersPersisted