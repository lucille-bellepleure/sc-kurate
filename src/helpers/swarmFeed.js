import { bee } from 'bee.js'

export const uploadData = async (data) => {
	try {
		const swarmReference = await bee.uploadData(process.env.REACT_APP_POSTAGE_BATCH_ID, JSON.stringify(data))
	return swarmReference.reference
	} catch (error) {
		console.log('Error when trying to upload to swarm: ', error)
	}
	
}

export const downloadData = async (ref) => {
	try {
		const retrievedData = await bee.downloadData(ref)
		return retrievedData.json()
	} catch (error) {
		console.log(error)
	}
}

export const setFeed = async (topic, value, pk) => {
	const encodedTopic = await bee.makeFeedTopic(topic)	
	try {
		const swarmReference = await bee.uploadData(process.env.REACT_APP_POSTAGE_BATCH_ID, JSON.stringify(value))
		const feedWriter = await bee.makeFeedWriter('sequence', encodedTopic, pk)
		const response = await feedWriter.upload(process.env.REACT_APP_POSTAGE_BATCH_ID, swarmReference.reference)
		return response
	} catch (error) {
		console.error(error)
	}
}

export const getFeed = async (topic, address) => {
	try {
		const encodedTopic = await bee.makeFeedTopic(topic)
		const feedReader = bee.makeFeedReader('sequence', encodedTopic, address)
		const feedUpdate = await feedReader.download()
		const retrievedData = await bee.downloadData(feedUpdate.reference)
		const readObject = retrievedData.json()
		return { code: 200, res: readObject }
	} catch (error) {
		console.error(error)
		return { code: 500, res: error }
	}
}
