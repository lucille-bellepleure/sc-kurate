import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// Sub-pages
import MyIdentity from './pages/MyIdentity';
import RemoveAccount from './pages/RemoveAccount';
import ChooseAvatar from '../account-create/pages/ChooseAvatar';
// Ids
const myIdentity = 'myIdentity';
const removeAccount = 'removeAccount';
const avatarStage = 'avatarStage';

function getAccount(state) {
    return state.account
}

export function AccountRoot() {

    const [stage, setStage] = useState(myIdentity)
    const account = useSelector(state => getAccount(state))

    const dispatch = useDispatch()

    const setUsername = (username) => dispatch({ type: 'SET_ACCOUNT', data: { username: username } })
    const setAvatar = (avatar) => dispatch({ type: 'SET_ACCOUNT', data: { avatar: avatar } })

    const removeAccountDef = () => {
        dispatch({
            type: "RESET_ACCOUNT"
        })
        history.push("/")
    }

    const history = useHistory()

    // Router
    switch (stage) {
        case myIdentity:
            return (
                <MyIdentity
                    avatar={account.avatar}
                    avatarStage={() => setStage(avatarStage)}
                    username={account.username}
                    setUsername={setUsername}
                    setAvatar={setAvatar}
                    publicKey={account.publicKey}
                    address={account.address}
                    nextStage={() => setStage(removeAccount)}
                    exitStage={() => history.push("/")}
                />
            );
        case removeAccount:
            return (
                <RemoveAccount
                    nextStage={() => setStage(myIdentity)}
                    removeAccount={removeAccountDef}>
                </RemoveAccount>
            );
        case avatarStage:
            return (
                <ChooseAvatar
                    setAvatar={setAvatar}
                    avatar={account.avatar}
                    exitStage={() => setStage(myIdentity)}
                >
                </ChooseAvatar>
            )

        default:
            return <h1>Oops...</h1>;
    }
}

export default AccountRoot;
