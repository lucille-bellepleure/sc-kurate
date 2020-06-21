import React, { useState, useRef, useEffect } from "react";
import { Form, FormProvider } from 'react-advanced-form'
import { Input } from 'react-advanced-form-addons'
import styles from "styles.module.css";
import createAccount from "../account-create.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Button, InputAdornment, TextField } from "@material-ui/core";
import { Check } from "@material-ui/icons"

import { createMnemonic } from 'services/account/actions'
function getMnemonic(state) {
  return state.account.mnemonic
}

export function CheckMnemonic({
  nextStage,
  exitStage,
  avatarStage,
  username,
  setUsername,
  avatar
}) {
  const mnemonic = useSelector(state => getMnemonic(state))
  const dispatch = useDispatch()

  useEffect(() => {
  }, [])

  let refForm = useRef(null)

  const validationRules = {
    name: {
      word3: ({ value }) => value === mnemonic[2],
      word5: ({ value }) => value === mnemonic[4],
      word9: ({ value }) => value === mnemonic[8],
      word11: ({ value }) => value === mnemonic[10],
    }
  }

  const handleSubmit = () => {
    nextStage()
  }

  const triggerSubmit = () => {
    refForm.submit().then((x) => {
      console.log(x)
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
            Check your writing:
    </div>
          <div className={createAccount.mnemoniccheck}>

            <div className={createAccount.textField}>
              <Input
                name="word3"
                placeholder="Word 3"
                required
              ></Input>
            </div>
            <div className={createAccount.textField}>
              <Input
                name="word5"
                placeholder="Word 5"
                required
              ></Input>
            </div>
            <div className={createAccount.textField}>
              <Input
                name="word9"
                placeholder="Word 9"
                required
              ></Input>
            </div>
            <div className={createAccount.textField}>
              <Input
                name="word11"
                placeholder="Word 11"
                required
              ></Input>
            </div>

          </div>

          <div
            tabIndex="2"
            onClick={() => triggerSubmit()}
            className={[styles.iconbuttonbig, createAccount.confirm].join(" ")}

          >
            <div className={styles.nextblueicon} />          </div>
        </Form>
      </FormProvider>

    </div >
  );
};

export default CheckMnemonic;
