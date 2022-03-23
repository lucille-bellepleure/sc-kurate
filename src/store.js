import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { persistentStore } from 'redux-pouchdb-plus'
import PouchDB from 'pouchdb'
import rootReducer from './rootReducer'
import rootSaga from './rootSaga'
import createSagaMiddleware from 'redux-saga'
import Web3 from 'web3'

// Goerli:
// User Registry: 0x0dF4981120e9cEeD5f95e2bF7618BB78fB3EC8f0
// KURA token: 0x3487d9fd4ead3bf081a679176e1eaff91ecd95ff

// xDai:
// 
// 

window.myWeb3 = new Web3(process.env.REACT_APP_WEB3_GATEWAY)

const sagaMiddleware = createSagaMiddleware()
const db = new PouchDB({ name: 'instaSwarm' })
const pouchMiddleware = persistentStore({ db })

const initialState = {}

const store = configureStore({
	reducer: rootReducer,
	middleware: [sagaMiddleware, ...getDefaultMiddleware()],
	enhancers: [pouchMiddleware],
	preloadedState: initialState,
})

export default store

// For dev purposes
window.dispatch = (type, kwargs) => {
	store.dispatch({ type, ...kwargs })
}

sagaMiddleware.run(rootSaga)
