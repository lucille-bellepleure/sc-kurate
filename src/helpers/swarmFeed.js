import { bee } from "bee.js"
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
    const dataObject = Utils.Data.prepareData(JSON.stringify(data))
    const reference = await bee.uploadData(dataObject)

    return reference
}

export const downloadData = async (ref) => {
    const retrievedData = await bee.downloadData(ref)
    const hexData = await Utils.Hex.bytesToHex(retrievedData)
    const stringData = hex_to_ascii(hexData)
    const readObject = JSON.parse(stringData)
    return readObject
}


export const setFeed = async (topic, value, pk) => {
    const encodedTopic = await bee.makeFeedTopic(topic)
    const dataObject = Utils.Data.prepareData(JSON.stringify(value))

    try {
        const swarmReference = await bee.uploadData(dataObject)
        const feedWriter = bee.makeFeedWriter('sequence', encodedTopic, pk)
        const response = await feedWriter.upload(swarmReference)
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
        const hexData = await Utils.Hex.bytesToHex(retrievedData)
        const stringData = hex_to_ascii(hexData)
        const readObject = JSON.parse(stringData)
        return readObject
    } catch (error) {
        console.error(error)
    }

}
