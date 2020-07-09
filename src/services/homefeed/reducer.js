import * as t from "./actionTypes";
import { persistentReducer } from "redux-pouchdb-plus";

// Service > user

const initialState = {};

function homefeedState(state = initialState, action) {
    switch (action.type) {
        case t.SET_POSTS:
            console.log('set posts')
            return {
                ...state,
                ...action.data
            };
        case t.SET_LIKE:
            return state.map((item) =>
                item._id === action.data._id
                    ? {
                        ...item,
                        ...action.data
                    }
                    : item
            );

        default:
            return state;
    }
}

const homefeed = persistentReducer(homefeedState, {
    name: "homefeed"
});

export default homefeed
