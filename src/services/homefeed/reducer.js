import * as t from "./actionTypes";
import { persistentReducer } from "redux-pouchdb-plus";

// Service > user

const initialState = [


];

function homefeed(state = initialState, action) {
    switch (action.type) {
        case t.ADD_POST:
            console.log('Addpost to reducer: ', action.data)
            return [...state, action.data];
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

// const homefeed = persistentReducer(homefeedState, {
//     name: "homefeed"
// });

export default homefeed
