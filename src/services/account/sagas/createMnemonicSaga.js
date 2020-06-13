import { delay, put, select } from "redux-saga/effects"
import { ethers } from 'ethers';

export default function* createMnemonicSaga(
    action
) {
    console.log("CreateMnemonic Saga", action.data)

    let wallet = ethers.Wallet.createRandom();
    let randomMnemonic = wallet.mnemonic;
    let mnemonicArray = randomMnemonic.split(" ");
    console.log(wallet, randomMnemonic, mnemonicArray);

    const accountObj = {
        status: 'new',
        wallet: wallet,
        mnemonic: mnemonicArray
    }

    yield put({ type: "SET_ACCOUNT", data: accountObj })
}