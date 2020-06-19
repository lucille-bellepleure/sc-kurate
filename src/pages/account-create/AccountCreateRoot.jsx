import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import defaultAvatar from "../../images/defaultAvatar.png";

// Sub-pages
import CreateOrRestore from './pages/CreateOrRestore';
import ShowMnemonic from './pages/ShowMnemonic';
import AccountView from './pages/AccountView';
import CheckMnemonic from './pages/CheckMnemonic';
import ChooseUsername from './pages/ChooseUsername';
import ChooseAvatar from './pages/ChooseAvatar';
import ChoosePassword from "./pages/ChoosePassword";
import SuccessEnter from "./pages/SuccessEnter";

import { createAccount } from "../../services/account/actions";

// Ids
const createOrRestore = 'createOrRestore';
const accountView = 'accountView';
const showMnemonic = 'showMnemonic';
const checkMnemonic = 'checkMnemonic';
const chooseUsername = 'chooseUsername';
const chooseAvatar = 'chooseAvatar';
const choosePassword = "choosePassword";
const successStage = "successStage";

function getAccount(state) {
    return state.account
}

export function AccountCreateRoot() {

    const [stage, setStage] = useState(createOrRestore)
    const history = useHistory()
    const dispatch = useDispatch()

    // User Creation state
    const [username, setUsername] = useState("");
    const [avatar, setAvatar] = useState(defaultAvatar);
    const [password, setPassword] = useState("");

    const accountData = useSelector(state => getAccount(state))
    console.log(accountData)

    const createAccount = (password) => {
        //const encryptedPrivatekey = window.web3.eth.accounts.encrypt(accountData.wallet.signingKey.privateKey, password);

        const accountObj = {
            //     avatar: avatar,
            username: username,
            password: password,
            //     status: 'account',
            //     mnemonic: [],
            //     wallet: {},
            //     address: accountData.wallet.signingKey.address,
            //     publicKey: accountData.wallet.signingKey.publicKey,
            //     privateKey: encryptedPrivatekey
        }

        dispatch({ type: "CREATE_ACCOUNT", data: accountObj })
        setStage(successStage)
    }

    // Router
    switch (stage) {
        case createOrRestore:
            return (
                <CreateOrRestore
                    nextStage={() => setStage(chooseUsername)}
                    exitStage={() => history.goBack()}
                />
            );
        case showMnemonic:
            return (
                <ShowMnemonic
                    nextStage={() => setStage(checkMnemonic)}
                    exitStage={() => setStage(createOrRestore)}>
                </ ShowMnemonic>
            );
        case checkMnemonic:
            return (
                <CheckMnemonic
                    nextStage={() => setStage(chooseUsername)}
                    exitStage={() => setStage(createOrRestore)}>
                    >
                </CheckMnemonic>
            );
        case chooseUsername:
            return (
                <ChooseUsername
                    avatar={avatar}
                    setUsername={setUsername}
                    username={username}
                    nextStage={() => setStage(choosePassword)}
                    exitStage={() => setStage(createOrRestore)}
                    avatarStage={() => setStage(chooseAvatar)}>
                </ChooseUsername>
            );
        case chooseAvatar:
            return (
                <ChooseAvatar
                    avatar={defaultAvatar}
                    exitStage={() => setStage(chooseUsername)}
                    setAvatar={setAvatar}>
                </ChooseAvatar>
            );
        case choosePassword:
            return (
                <ChoosePassword
                    createAccount={createAccount}
                    exitStage={() => setStage(createOrRestore)}
                    setPassword={setPassword}
                    password={password}
                />
            );
        case successStage:
            return (
                <SuccessEnter />
            );
        case 'newAccount':
            return (
                <AccountView
                    account={accountData}
                    nextStage={() => setStage()}
                />
            );
        default:
            return <h1>Oops...</h1>;
    }
}

export default AccountCreateRoot;
