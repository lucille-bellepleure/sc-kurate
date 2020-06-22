import React, { useState, useEffect, useRef } from "react";
import { Form, FormProvider } from 'react-advanced-form';
import { TextField } from "@material-ui/core";
import styles from "styles.module.css";
import createAccount from "../account-create.module.css";

import { ethers } from 'ethers';
import { useDispatch } from "react-redux";

window.ethers = ethers;


export function RestoreAccountStart({
    nextStage,
    exitStage,
    setUsername,
    setAvatar
}) {

    let refForm = useRef(null)
    let refText = useRef(null)

    const [mnemonicInput, setMnemonicInput] = useState("")

    const validationRules = {

    }

    const handleSubmit = () => {
        nextStage()
    }

    const dispatch = useDispatch()

    const handleChange = (e) => {
        console.log(e.target.value)
        setMnemonicInput(e.target.value)
    }

    const restoreMnemonic = () => {
        const wallet = ethers.Wallet.fromMnemonic(mnemonicInput)
        console.log(wallet)
        window.fds.Account.SwarmStore.SF.get(wallet.address, 'userdata').then((res) => {
            console.log(JSON.parse(res))
            const accountObj = {
                address: wallet.address,
                publicKey: wallet.signingKey.publicKey,
                privateKey: wallet.privateKey,
                mnemonic: wallet.mnemonic
            }

            let result = JSON.parse(res)
            setAvatar(result.useravatar);
            setUsername(result.username)
            dispatch({ type: 'SET_ACCOUNT', data: accountObj });
            nextStage();
        })
    }

    return (
        <div className={createAccount.formcontainer}>
            <FormProvider>

                <Form rules={validationRules} ref={form => refForm = form} action={handleSubmit}>

                    <div className={createAccount.closeButton} onClick={exitStage}>
                        <div className={styles.exitgrayicon} />
                    </div>
                    <div className={createAccount.formtitle}>
                        Restore your account
    </div>
                    <div className={createAccount.mnemoniccheck}>

                        <div className={createAccount.textField}>
                            <TextField
                                ref={refText}
                                onChange={(e) => handleChange(e)}
                                id="outlined-multiline-static"
                                label="Wordlist backup"
                                multiline
                                rows={4}
                                placeholder="12 Word mnemonic"
                                variant="outlined"
                            />
                        </div>
                    </div>
                    <div
                        tabIndex="2"
                        className={[styles.iconbuttonbig, createAccount.confirm].join(" ")}
                        onClick={() => restoreMnemonic()}
                    >
                        <div className={styles.nextblueicon} />
                    </div>
                </Form>
            </FormProvider>
        </div >
    );
};

export default RestoreAccountStart;
