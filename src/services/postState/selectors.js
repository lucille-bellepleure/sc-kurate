import { mountPoint } from '.'
import { createSelector } from 'reselect'

export const getPostState = createSelector(
	(state) => state[mountPoint],
	(postState) => postState
)

export const getPostStateAsArray = createSelector(getPostState, (postState) => Object.values(postState))

export const getPostById = createSelector(
	getPostState,
	(_, id) => id,
	(postState, id) => postState[id]
)
