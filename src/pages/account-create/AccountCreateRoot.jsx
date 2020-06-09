import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Sub-pages
import AccountCreate from './pages/AccountCreate';
import AccountView from './pages/AccountView';

// Ids
const accountCreate = 'accountCreate';
const accountView = 'accountView';

function getAccount(state) {
    return state.account
}

export function AccountCreateRoot() {

    const [stage, setStage] = useState(accountCreate)

    const accountData = useSelector(state => getAccount(state))
    console.log(accountData)

    // Router
    switch (accountData.status) {
        case 'noAccount':
            return (
                <AccountCreate
                    nextStage={() => setStage()}
                />
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
