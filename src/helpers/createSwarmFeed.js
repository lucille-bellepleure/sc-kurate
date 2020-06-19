import { BzzFeed } from '@erebos/bzz-feed'
import { BzzNode } from '@erebos/bzz-node'
import { pubKeyToAddress } from '@erebos/keccak256'
import { createKeyPair, sign } from '@erebos/secp256k1'

export default async function createSwarmFeed() {
    const BZZ_URL = 'http://swarm.dappnode/'

    // This setup is meant for demonstration purpose only - keys and signatures security must be handled by the application
    const keyPair = createKeyPair()
    const user = pubKeyToAddress(keyPair.getPublic('array'))
    const signBytes = async bytes => sign(bytes, keyPair)
    const bzz = new BzzNode({ url: BZZ_URL })
    const bzzFeed = new BzzFeed({ bzz, signBytes })

    // website will be accessible with the URL `${BZZ_URL}/bzz:/${feedHash}`
    const feedHash = await bzzFeed.createManifest({
        user,
        name: 'my-awesome-website',
    })

    // This function can be called any time the website contents change
    const publishContents = async contents => {
        // setFeedContent() uploads the given contents and updates the feed to point to the contents hash
        await bzzFeed.setContent(feedHash, contents, { defaultPath: 'index.html' })
    }

    // Example use of publishContents()
    const setupContents = async () => {
        await publishContents({
            'index.html': { contentType: 'text/html', data: '<h1>Hello world</h1>' },
        })
    }

    return 'hello world'

}