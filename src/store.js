import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistentStore } from "redux-pouchdb-plus";
import PouchDB from "pouchdb";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import createSagaMiddleware from "redux-saga";
//import { BeeClient } from 'bee-client-lib';

import FDS from "fds.js";
import Web3 from "web3";

let gatewayAddress = "http://localhost:1633";

//window.bee = new BeeClient(gatewayAddress, { timeout: 10000 });

window.myWeb3 = new Web3('https://goerli.infura.io/v3/46958faea5154db687257f9598b0e269')

window.fds = new FDS();

// window.fds = new FDS({
//     tokenName: 'gas',
//     swarmGateway: 'http://localhost:1633',
//     ethGateway: 'https://goerli.infura.io/v3/46958faea5154db687257f9598b0e269',
//     faucetAddress: 'http://localhost:3001/gimmie',
//     chainID: '5',
//     httpTimeout: 1000,
//     gasPrice: 0.001,
//     walletVersion: 1,
//     scratchDir: '/tmp/something',
//     ensConfig: {
//         domain: 'instaswarm.eth',
//         registryAddress: '0xf5edc04158Bec885e6435605496dE40736E3934C',
//         subdomainRegistrarAddress: '0x2710B36f042e209a154Ec9233483510D3FC15f14',
//         resolverContractAddress: '0x22532D2ec451BD4c626313cE9C7385eFaA2b8a45'
//     }
// })
const sagaMiddleware = createSagaMiddleware();
const db = new PouchDB({ name: "instaSwarm" });
const pouchMiddleware = persistentStore({ db });

const initialState = {}

const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware, ...getDefaultMiddleware()],
    enhancers: [pouchMiddleware],
    preloadedState: initialState
});

export default store;

// For dev purposes
window.dispatch = (type, kwargs) => {
    store.dispatch({ type, ...kwargs });
};

sagaMiddleware.run(rootSaga);