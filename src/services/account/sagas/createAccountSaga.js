import { delay, put, select } from "redux-saga/effects"


export default function* createAccountSaga(
    action
) {
    console.log("CreateAccount Saga", action.data)

    const account = yield window.fds.CreateAccount(action.data.username, action.data.password)

    //const account = yield window.web3.eth.accounts.create(new Date().toISOString())

    //console.log("Created account: ", account.address, account.privateKey)
    const accountObj = {
        // address: account.address,
        // privateKey: account.privateKey,
        // accountName: action.data.accountname,
        // passWord: action.data.password,
        status: 'accountSet'
    }

    console.log(account);

    yield put({ type: "SET_ACCOUNT", data: accountObj })
}