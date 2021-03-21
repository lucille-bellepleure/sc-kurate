import * as t from "./actionTypes";
import { persistentReducer } from "redux-pouchdb-plus";

// Service > user

const initialState = {};

function postState(state = initialState, action) {
    switch (action.type) {
        case t.ADD_POST:
            console.log('add post')
            return {
                ...state,
                ...action.data
            };
        case t.CLEAR_CACHE:
            return {}
        default:
            return state;
    }
}

const postStatePersisted = persistentReducer(postState, {
    name: "postState"
});

export default postStatePersisted
//export default postState
