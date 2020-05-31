import { delay, put, select } from "redux-saga/effects"

export default function* createAccountSage(
    action
) {
    console.log("CreateAccount Saga", action.data)
    const account = yield window.fds.CreateAccount(action.data.accountname, action.data.password, (msg) => {
        console.log(msg)
    })
}