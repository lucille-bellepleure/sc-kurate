import * as t from "./actionTypes";

// Service > user

const initialState = {
    'showPasswordUnlock': false,
    'hasUser': true,
    'passWord': null
};

function system(state = initialState, action) {
    switch (action.type) {
        case t.SET_SYSTEM:
            console.log('system', action)
            return {
                ...state,
                ...action.data
            };
        default:
            return state;
    }
}

export default system