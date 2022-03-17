import * as t from './actionTypes'
import { persistentReducer } from 'redux-pouchdb-plus'

// Service > user

const initialState = {}

function homefeed(state = initialState, action) {
	switch (action.type) {
		case t.SET_HOMEFEED:
			console.log('sethomefeed')
			return {
				...state,
				...action.data,
			}
		default:
			return state
	}
}

const homefeedPersisted = persistentReducer(homefeed, {
	name: 'homefeed',
})

export default homefeedPersisted
