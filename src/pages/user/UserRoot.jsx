import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import sortByProp from "helpers/sortByProp"

// Sub-pages
import UserHome from './pages/UserHome';
import UserFollowing from './pages/UserFollowing';
// Ids
const userFetching = 'userFetching';
const userHome = 'userHome';

const userFollowing = 'userFollowing';

function getUserFromState(state, address) {
    return state.users[address]
}

function getUser(state) {
    return state.account
}

export function PostItemRoot() {

    const history = useHistory()
    const dispatch = useDispatch()
    const [stage, setStage] = useState(userFetching)

    const [userfeed, setUserfeed] = useState([])
    const [usersubs, setUsersubs] = useState([])

    const account = useSelector(state => getUser(state))

    const params = useParams()
    const address = params.userAddress

    const user = useSelector(state => getUserFromState(state, address))

    useEffect(() => {
        if (address) {
            dispatch({ type: 'GET_USER', data: address })
            setStage(userFetching)
        }

    }, [params.userAddress])

    useEffect(() => {
        if (user) {
            setUserfeed(Object.values(user.posts).sort(sortByProp("time", "desc")))
            setUsersubs(Object.values(user.subs))
            setStage(userHome)
        }
    }, [user])

    // Router
    switch (stage) {
        case userFetching:
            return (
                <div style={{ color: '#ffffff' }
                }> User fetching</div >
            )
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
