let Td = require('util').TextDecoder;
let td = new Td();

let Bee = require('@ethersphere/bee-js');
let bee = new Bee.Bee('https://bee-gateway.duckdns.org');

let ref = process.env.BREF
let topic = '0x0000000000000000000000000000000000000000000000000000000000000000';

let pk = process.env.PRIVATEKEY
let ad = process.env.ADDRESS

let update = async (pk, ad, ref) => {
    let w = bee.makeFeedWriter('sequence', topic, pk);
    let m = await bee.createFeedManifest('sequence', topic, ad);
    console.log('m', m);
    let r3 = await w.upload(ref);
}

update(pk, ad, ref);