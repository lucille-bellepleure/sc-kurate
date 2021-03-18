import React, { useState, useEffect, useRef } from "react";
import { Form, FormProvider, setErrors } from 'react-advanced-form';
import { TextField } from "@material-ui/core";
import styles from "styles.module.css";
import createAccount from "../account-create.module.css";
import { setFeed, getFeed } from "helpers/swarmFeed"

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

    let [error, setError] = useState();

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

    /*
    price drum choose pluck dust weekend story cruel library photo crack bundle
    */

    const restoreMnemonic = async () => {

        let wallet = {}
        try {
            wallet = ethers.Wallet.fromMnemonic(mnemonicInput)
            console.log(wallet)

            await getFeed('userdata', wallet.address).then((result) => {
                const accountObj = {
                    address: wallet.address,
                    publicKey: wallet.signingKey.publicKey,
                    privateKey: wallet.privateKey,
                    mnemonic: wallet.mnemonic,

                }

                setAvatar(result.useravatar);
                setUsername(result.username)
                dispatch({ type: 'SET_ACCOUNT', data: accountObj });
                nextStage();
            }).catch((e) => { console.log(e); setError(e.message); })
        } catch (e) {
            setError(e.message);
        }
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

                        <div>
                            <TextField
                                className={createAccount.textField}
                                ref={refText}
                                onChange={(e) => handleChange(e)}
                                id="outlined-multiline-static"
                                label="Wordlist backup"
                                multiline
                                rows={6}
                                placeholder="12 Word mnemonic"
                                variant="outlined"
                            />
                        </div>
                    </div>
                    <div>{error}</div>
                    <div className={createAccount.dialogiconbox}>

                        <div
                            tabIndex="2"
                            className={[styles.iconbuttonbig, createAccount.confirm].join(" ")}
                            onClick={() => restoreMnemonic()}
                        >
                            <div className={styles.nextblueicon} />
                        </div>
                    </div>
                </Form>
            </FormProvider>
        </div >
    );
};

export default RestoreAccountStart;
