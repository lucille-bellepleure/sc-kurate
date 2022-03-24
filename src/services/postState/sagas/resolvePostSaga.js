import { put, select } from 'redux-saga/effects'
import * as s from '../selectors'
import { setFeed, getFeed, downloadData } from 'helpers/swarmFeed'

window.getFeed = getFeed
window.setFeed = setFeed

export default function* resolvePostSaga(action) {
	console.log("Resolve Post Saga", action)

	// First resolve my posts
	const postId = action.postId
	const userAddress = action.userAddress
	//const serial = action.serial

	if (postId) {
		const cachedPosts = yield select(s.getPostState)

		if (!cachedPosts[postId]) {
			const thisPost = yield downloadData(postId)
			console.log(postId)

			const userData = yield getFeed('userdata', userAddress)
			//console.log(userData)
			thisPost._id = thisPost.time
			//thisPost.serial = serial
			thisPost.avatar = userData.res.useravatar
			thisPost.username = userData.res.username
			thisPost.address = userData.res.address
			thisPost.likes = 0
			thisPost.location = 'Unknown'
			thisPost.type = 'post'
			thisPost.format = 'image'
			yield put({ type: 'ADD_POST', data: { [postId]: thisPost } })
		} else {
			console.log('Post in cache')
		}
	}
}
