import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

// Sub-pages
import UserHome from './pages/UserHome';
import UserFollowing from './pages/UserFollowing';
// Ids
const userHome = 'userHome';
const userFollowing = 'userFollowing';

function getUserFromState(state) {
    return state.user
}

function getUser(state) {
    return state.account
}

export function PostItemRoot() {

    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => getUserFromState(state))
    const [stage, setStage] = useState(userHome)

    console.log(user)
    const account = useSelector(state => getUser(state))

    const userfeed = Object.values(user.posts)
    const usersubs = Object.values(user.subs)


    const params = useParams()
    const address = params.userAddress

    useEffect(() => {
        if (address) {
            dispatch({ type: 'GET_USER', data: address })
        }
    }, [])

    // Router
    switch (stage) {
        case userHome:
            return (
                <UserHome
                    account={account}
                    user={user}
                    account={account}
                    userfeed={userfeed}
                    usersubs={usersubs}
                    nextStage={() => setStage(userFollowing)}
                />
            );
        case userFollowing:
            return (
                <UserFollowing
                    account={account}
                    user={user}
                    account={account}
                    userfeed={userfeed}
                    usersubs={usersubs}
                    nextStage={() => setStage()}
                    exitStage={() => { setStage(userHome) }}
                />
            );

        default:
            return <h1>Oops...</h1>;
    }
}

export default PostItemRoot;
