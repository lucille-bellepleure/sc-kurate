import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistentStore } from "redux-pouchdb-plus";
import PouchDB from "pouchdb";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import createSagaMiddleware from "redux-saga";
import Web3 from "web3";

window.myWeb3 = new Web3('https://goerli.infura.io/v3/46958faea5154db687257f9598b0e269')

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