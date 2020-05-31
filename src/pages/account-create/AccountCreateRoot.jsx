import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Sub-pages
import AccountCreate from './pages/AccountCreate';

// Ids
const accountCreate = 'accountCreate';

export function AccountCreateRoot() {

    const [stage, setStage] = useState(accountCreate)

    // Router
    switch (stage) {
        case accountCreate:
            return (
                <AccountCreate
                    nextStage={() => setStage()}
                />
            );
        default:
            return <h1>Oops...</h1>;
    }
}

export default AccountCreateRoot;
