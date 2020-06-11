import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// Sub-pages
import CreateOrRestore from './pages/CreateOrRestore';
import ShowMnemonic from './pages/ShowMnemonic';
import AccountView from './pages/AccountView';
import { createAccount } from "../../services/account/actions";

// Ids
const createOrRestore = 'createOrRestore';
const accountView = 'accountView';
const showMnemonic = 'showMnemonic';

function getAccount(state) {
    return state.account
}

export function AccountCreateRoot() {

    const [stage, setStage] = useState(createOrRestore)
    const history = useHistory()
    const accountData = useSelector(state => getAccount(state))
    console.log(accountData)

    // Router
    switch (stage) {
        case createOrRestore:
            return (
                <CreateOrRestore
                    nextStage={() => setStage(showMnemonic)}
                    exitStage={() => history.goBack()}
                />
            );
        case showMnemonic:
            return (
                <ShowMnemonic></ShowMnemonic>
            )
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
