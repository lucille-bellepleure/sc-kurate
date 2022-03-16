import { Bee } from "@ethersphere/bee-js";
const beeUrl = process.env.REACT_APP_BEE_GATEWAY
//debugger
window.bee = new Bee(beeUrl);
export const bee = new Bee(beeUrl);
