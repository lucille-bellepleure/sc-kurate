import { setFeed, getFeed, downloadData, uploadData } from "helpers/swarmFeed"
import { createKeyPair } from '@erebos/secp256k1'
import { pubKeyToAddress } from '@erebos/keccak256'
import { toHex, hexToByteArray, byteArrayToHex, numbersToByteArray, stringToUint8Array } from 'helpers/conversion';

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}


var tokenAbi = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getApproved", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "receiver", "type": "address" }, { "internalType": "uint256", "name": "serial", "type": "uint256" }, { "internalType": "string", "name": "tokenURI", "type": "string" }], "name": "mintToken", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ownerOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "_data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "tokenURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
var registryAbi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            }
        ],
        "name": "addVerification",
        "outputs": [
            {
                "internalType": "string",
                "name": "_feedback",
                "type": "string"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address payable",
                "name": "_newOwner",
                "type": "address"
            }
        ],
        "name": "changeOwner",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "publicKey",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "userName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "userAvatar",
                "type": "string"
            }
        ],
        "name": "createUser",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "_err",
                "type": "string"
            }
        ],
        "name": "Error",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address payable",
                "name": "userAddress",
                "type": "address"
            }
        ],
        "name": "giveGodVerification",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "userName",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "userAvatar",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "publicKey",
                "type": "string"
            }
        ],
        "name": "UserAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            }
        ],
        "name": "UserAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "_from",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "_to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_numverifications",
                "type": "uint256"
            }
        ],
        "name": "VerificationAdded",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address payable",
                "name": "userAddress",
                "type": "address"
            }
        ],
        "name": "checkVeracity",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "numVerifications",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            }
        ],
        "name": "readUser",
        "outputs": [
            {
                "internalType": "string",
                "name": "userName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "userAvatar",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "publicKey",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "numVerifications",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "verificationthresh",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]
export const storePost = async (dataObject, cb) => {

    const postObject = dataObject;
    const userObject = dataObject.user;

    window.myWeb3.eth.defaultAccount = userObject.address;
    debugger
    let decryptedPrivateKey
    try {
        decryptedPrivateKey = window.myWeb3.eth.accounts.decrypt(userObject.privateKey, dataObject.password);
    } catch (error) {
        console.log(error)
    }

    const pk = decryptedPrivateKey.privateKey.substring(2, 66)

    const privateKey1 = new Buffer(pk, 'hex');


    // Now let's mint an NFT for it 

    var contractAddress = "0x3487D9fD4eAD3bf081a679176E1Eaff91eCD95fF"
    var contract = new window.myWeb3.eth.Contract(tokenAbi, contractAddress);
    var res = await contract.methods.symbol().call()

    var serial = Date.now();

    const storedPost = await uploadData(postObject.post)
    console.log('Stored posts', storedPost)
    const testPost = await downloadData(storedPost)
    console.log('retrieved ', testPost)

    const myData = contract.methods.mintToken(userObject.address, serial, storedPost).encodeABI();

    window.myWeb3.eth.getTransactionCount(userObject.address, (err, txCount) => {
        // Build the transaction

        const txObject = {
            nonce: window.myWeb3.utils.toHex(txCount),
            to: contractAddress,
            value: window.myWeb3.utils.toHex(window.myWeb3.utils.toWei('0', 'ether')),
            gasLimit: window.myWeb3.utils.toHex(2100000),
            gasPrice: window.myWeb3.utils.toHex(window.myWeb3.utils.toWei('6', 'gwei')),
            data: myData
        }

        //const common = new Common({ chain: 'goerli' })
        //const tx = Transaction.fromTxData(txObject, { common })

        //tx.sign(privateKey1)
        window.myWeb3.eth.accounts.signTransaction(txObject, decryptedPrivateKey.privateKey).then(signed => {
            window.myWeb3.eth.sendSignedTransaction(signed.rawTransaction).on('receipt',
                async function updateFeed() {

                    try {
                        var oldPosts = await getFeed('userposts', userObject.address);
                        //let tempPosts = JSON.parse(oldPost);


                        let time = new Date().toISOString();
                        oldPosts.posts[storedPost] = { time: time, bzz: storedPost, nft: serial }
                        //let stringedPosts = JSON.stringify(newPosts)
                        console.log('oldPosts: ', oldPosts)


                        await setFeed(
                            'userposts',
                            oldPosts,
                            decryptedPrivateKey.privateKey
                        )
                        cb()

                        return true
                    } catch (error) {
                        console.log('ERR', error.message)
                        return error
                    }
                }
            )


        });



        // var raw = '0x' + tx.serialize().toString('hex');
        //             //Broadcast the transaction
        //             const transaction = window.myWeb3.eth.sendSignedTransaction(raw, (err, tx) => {
        //                 console.log(err, tx)
        //             });


    });


}

export const deletePost = async (userObject, password, bzz, serial, cb) => {
    let decryptedPrivateKey
    try {
        decryptedPrivateKey = window.myWeb3.eth.accounts.decrypt(userObject.privateKey, password);
    } catch (error) {
        console
            .log(error)
    }
    try {

        var oldPosts = await getFeed('userposts', userObject.address);
        //let tempPosts = JSON.parse(oldPost);

        delete oldPosts.posts[bzz]
        //let stringedPosts = JSON.stringify(newPosts)
        console.log('oldPosts: ', oldPosts)


        await setFeed(
            'userposts',
            oldPosts,
            decryptedPrivateKey.privateKey
        )
        cb()

        return true
    } catch (error) {
        console.log('ERR', error.message)
        return error
    }
    cb(bzz, serial)
}

export const fetchBalance = async (address) => {
    console.log(address)
    var contractAddress = "0x3487D9fD4eAD3bf081a679176E1Eaff91eCD95fF";
    var contract = new window.myWeb3.eth.Contract(tokenAbi, contractAddress);
    const kuraBalance = await contract.methods.balanceOf(address).call()
    const weiBalance = await window.myWeb3.eth.getBalance(address)
    let ethBalance = await window.myWeb3.utils.fromWei(weiBalance, 'ether');

    return { kuraBalance, ethBalance }
}

export const checkVerification = async (address) => {
    console.log(address);
    var contractAddress = "0x0dF4981120e9cEeD5f95e2bF7618BB78fB3EC8f0";
    var contract = new window.myWeb3.eth.Contract(registryAbi, contractAddress);
    const verification = await contract.methods.checkVeracity(address).call()
    console.log(verification)
    return verification
}

export const resolveShortcode = async (shortcode) => {
    const PRIVATE_KEY_BYTES_LENGTH = 32
    const PUBLIC_KEY_BYTES_LENGTH = 33
    const ADDRESS_BYTES_LENGTH = 20

    console.log("ResolveShortCode Saga", shortcode)
    // Get timestamp
    //const timeStamp = 123456
    var timeStamp = Math.round((new Date()).getTime() / 1000000);

    // ROund on the minute
    // Generate 4 digit short 
    //const shortCode = Math.floor(1000 + Math.random() * 9000);
    const shortCode = shortcode
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
    let result;
    let accountObj;

    result = await getFeed('shortcode', address)
    console.log(result)
    if (result.code == 200) {
        // now let's also get the balances and user verification 
        let balances = await fetchBalance(result.res.useraddress)
        let veracity = await checkVerification(result.res.useraddress)

        accountObj = {
            peerAvatar: result.res.useravatar,
            peerUsername: result.res.username,
            peerAddress: result.res.useraddress,
            peerBalances: balances,
            peerVeracity: veracity
        };

        console.log(accountObj);
        return accountObj
    } else {
        console.log('error in resolving shortcode')
        return "error"
    }

}