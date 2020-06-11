import { delay, put, select } from "redux-saga/effects"
import { ethers } from 'ethers';

export default function* createMnemonicSaga(
    action
) {
    console.log("CreateMnemonic Saga", action.data)

    let wallet = ethers.Wallet.createRandom();
    let randomMnemonic = wallet.mnemonic;
    console.log(wallet, randomMnemonic);

    const accountObj = {
        status: 'new',
        mnemonic: randomMnemonic
    }

    yield put({ type: "SET_ACCOUNT", data: accountObj })
}