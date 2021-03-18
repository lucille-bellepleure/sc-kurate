import { delay, put, select, fork } from "redux-saga/effects"
import { createKeyPair } from '@erebos/secp256k1'
import { pubKeyToAddress } from '@erebos/keccak256'
import { toHex, hexToByteArray, byteArrayToHex, numbersToByteArray, stringToUint8Array } from 'helpers/conversion';
import { setFeed, getFeed } from "helpers/swarmFeed"

export default function* resolveShortCodeSaga(
    action
) {

    const PRIVATE_KEY_BYTES_LENGTH = 32
    const PUBLIC_KEY_BYTES_LENGTH = 33
    const ADDRESS_BYTES_LENGTH = 20

    console.log("ResolveShortCode Saga", action.data)
    // Get timestamp
    const timeStamp = 123456
    // ROund on the minute
    // Generate 4 digit short 
    //const shortCode = Math.floor(1000 + Math.random() * 9000);
    const shortCode = action.data
    // timestamp * short
    const seedstring = shortCode.toString().concat('-instaswarm-', timeStamp.toString())
    console.log(seedstring)
    //const test = stringToUint8Array(seedstring)
    const privateKeyGenerated = byteArrayToHex(stringToUint8Array(seedstring), false)

    const keyPair = createKeyPair(privateKeyGenerated)
    const privateKey = toHex(hexToByteArray(keyPair.getPrivate('hex'), PRIVATE_KEY_BYTES_LENGTH))
    const publicKey = toHex(hexToByteArray(keyPair.getPublic(true, 'hex'), PUBLIC_KEY_BYTES_LENGTH))
    const address = pubKeyToAddress(keyPair.getPublic('array'))

    console.log('address: ', address, 'private: ', privateKey, 'public: ', publicKey)

    // Use keypair to write swarm feed with usernamme avatar and address
    // const swarmFeed = yield window.fds.Account.SwarmStore.SF.set(
    //     address,
    //     'shortcode',
    //     privateKey,
    //     {
    //         username: action.data.username,
    //         useravatar: action.data.useravatar,
    //         publicKey: publicKey,
    //         address: address
    //     })

    // Set short code in redux
    const result = yield getFeed('shortcode', address)

    console.log(result)

    const accountObj = {
        peerAvatar: result.useravatar,
        peerUsername: result.username,
        peerAddress: result.address
    };

    console.log(accountObj);

    yield put({ type: "SET_ACCOUNT", data: accountObj })
}