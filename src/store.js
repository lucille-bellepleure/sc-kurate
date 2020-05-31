import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import createSagaMiddleware from "redux-saga";
import FDS from "fds.js"
const sagaMiddleware = createSagaMiddleware();

const initialState = {}

const fds = new FDS()
window.fds = fds

const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware, ...getDefaultMiddleware()],
    preloadedState: initialState
});

export default store;

// For dev purposes
window.dispatch = (type, kwargs) => {
    store.dispatch({ type, ...kwargs });
};

sagaMiddleware.run(rootSaga);