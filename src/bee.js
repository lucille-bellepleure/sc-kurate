import { Bee, BeeDebug } from '@ethersphere/bee-js'

//const beeDebug = new BeeDebug(process.env.REACT_APP_BEE_GATEWAY);
console.log(process.env)
export const bee = new Bee(process.env.REACT_APP_BEE_GATEWAY)
