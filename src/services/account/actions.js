import * as t from "./actionTypes"

export const createAccount = data => ({
    type: t.CREATE_ACCOUNT,
    data
})

export const createMnemonic = data => ({
    type: t.CREATE_MNEMONIC,
    data
})