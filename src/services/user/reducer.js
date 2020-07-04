import * as t from "./actionTypes";
import { persistentReducer } from "redux-pouchdb-plus";

// Service > user

const initialState = {
    account:
        { username: "fetching" },
    posts: {},
    subs: {}
};

function user(state = initialState, action) {
    switch (action.type) {
        case t.SET_USER:
            return {
                ...state,
                ...action.data
            };

        default:
            return state;
    }
}

// const homefeed = persistentReducer(homefeedState, {
//     name: "homefeed"
// });

export default user
