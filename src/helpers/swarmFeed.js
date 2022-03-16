import { bee, beeDebug } from "bee.js"
import { Utils } from "@ethersphere/bee-js";

function hex_to_ascii(str1) {
    var hex = str1.toString();
    var str = '';
    for (var n = 0; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
}

export const uploadData = async (data) => {

    const postageBatchId = process.env.REACT_APP_POSTAGE_BATCH_ID
    const swarmReference = await bee.uploadData(postageBatchId, JSON.stringify(data))

    //const dataObject = Utils.Data.prepareData(JSON.stringify(data))
    //const reference = await bee.uploadData(dataObject)
    return swarmReference.reference
}

export const downloadData = async (ref) => {

    const retrievedData = await bee.downloadData(ref)
    // const hexData = await Utils.Hex.bytesToHex(retrievedData)
     //const stringData = hex_to_ascii(hexData)
     const readObject =  retrievedData.json()


    //const retrievedData = await bee.downloadData(ref)
    //const hexData = await Utils.Hex.bytesToHex(retrievedData)
    //const stringData = hex_to_ascii(hexData)
    //const readObject = JSON.parse(stringData)
    return readObject
}

export const setFeed = async (topic, value, pk) => {
    const encodedTopic = await bee.makeFeedTopic(topic)
    //const dataObject = Utils.Data.prepareData(JSON.stringify(value))

    try {

        //const postageBatchId = await beeDebug.createPostageBatch("100", 17)
        //const data = new Uint8Array([1, 2, 3])
        //const reference = await bee.uploadData(data)
        //const topic = '0000000000000000000000000000000000000000000000000000000000000000'
        //const signer = '0x634fb5a872396d9693e5c9f9d7233cfa93f395c093371017ff44aa9ae6564cdd'
        //const feedWriter = bee.makeFeedWriter('sequence', topic, signer)
        
        const postageBatchId = process.env.REACT_APP_POSTAGE_BATCH_ID
        const swarmReference = await bee.uploadData(postageBatchId, JSON.stringify(value))

        const feedWriter = await bee.makeFeedWriter('sequence', encodedTopic, pk)

        const response = await feedWriter.upload(postageBatchId, swarmReference.reference)

        //const response = await feedWriter.upload(swarmReference)
        return response
    } catch (error) {
        console.error(error)
    }
}

export const getFeed = async (topic, address) => {
    try {
        
        const encodedTopic = await bee.makeFeedTopic(topic)
        //const feedReader = bee.makeFeedReader('sequence', encodedTopic, address)
        //const feedUpdate = await feedReader.download()
        const feedReader = bee.makeFeedReader('sequence', encodedTopic, address)
        const feedUpdate = await feedReader.download()
        //console.log(feedUpdate)
        
       const retrievedData = await bee.downloadData(feedUpdate.reference)
       // const hexData = await Utils.Hex.bytesToHex(retrievedData)
        //const stringData = hex_to_ascii(hexData)
        const readObject =  retrievedData.json()
        return { code: 200, res: readObject }
    } catch (error) {
        console.error(error)
        return { code: 500, res: error }
    }
}
