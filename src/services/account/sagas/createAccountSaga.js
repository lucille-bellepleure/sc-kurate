import { delay, put, select } from "redux-saga/effects"

export default function* createAccountSage(
    action
) {
    console.log("CreateAccount Saga", action.data)
    //const account = yield window.web3.eth.accounts.create(new Date().toISOString())

    //console.log("Created account: ", account.address, account.privateKey)
    const accountObj = {
        // address: account.address,
        // privateKey: account.privateKey,
        // accountName: action.data.accountname,
        // passWord: action.data.password,
        // status: 'newAccount'
    }
    yield put({ type: "SET_ACCOUNT", data: accountObj })
}