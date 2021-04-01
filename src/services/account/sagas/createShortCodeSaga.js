import { delay, put, select, fork } from "redux-saga/effects"
import { createKeyPair } from '@erebos/secp256k1'
import { pubKeyToAddress } from '@erebos/keccak256'
import { toHex, hexToByteArray, byteArrayToHex, numbersToByteArray, stringToUint8Array } from 'helpers/conversion';
import { hexValue } from '@erebos/hex';
import { setFeed, getFeed } from "helpers/swarmFeed"
import { getAccount } from "services/account/selectors"

export default function* createShortCodeSaga(
    action
) {

    const PRIVATE_KEY_BYTES_LENGTH = 32
    const PUBLIC_KEY_BYTES_LENGTH = 33
    const ADDRESS_BYTES_LENGTH = 20

    const account = yield select(getAccount)


    console.log("CreateShortCode Saga", action.data)
    // Get timestamp
    //const timeStamp = 123456
    var timeStamp = Math.round((new Date()).getTime() / 1000000);

    // ROund on the minute
    // Generate 4 digit short 
    const shortCode = Math.floor(1000 + Math.random() * 9000);
    //const shortCode = 1234
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
    const swarmFeed = yield setFeed(
        'shortcode',
        {
            username: action.data.username,
            useravatar: action.data.useravatar,
            useraddress: account.address,
            userpublickkey: account.publicKey,
            publicKey: publicKey,
            address: address
        },
        privateKey)

    // Set short code in redux
    const swarmRes = yield getFeed('shortcode', address)
    console.log(swarmRes)

    const accountObj = {
        shortcode: { code: shortCode, time: 123456 },
    };

    console.log(accountObj);

    yield put({ type: "SET_ACCOUNT", data: accountObj })
}