import React, {useState, useRef} from "react";
import styles from "styles.module.css";
import createAccountStyles from "../account-create.module.css";
import {Form, FormProvider} from "react-advanced-form";
import {Input} from "react-advanced-form-addons";

export function ChoosePassword({createAccount, exitStage, setPassword, password}) {
  let refForm = useRef(null);

  const validationRules = {
    name: {
      password2: ({get, value}) => {
        return value === get(["password", "value"]);
      }
    }
  };

  const handleSubmit = ({fields}) => {
    // Make sure to return a Promise here
    console.log("hello form", fields);
    createAccount(fields.password.value);
  };

  const handleClick = () => {
    refForm.submit().then(submitState => {
      console.log("formSubmit");
      // This is called after the Promise of `this.handleSubmit` resolves/rejects
    });
  };

  return (<div className={createAccountStyles.formcontainer}>
    <FormProvider>
      <Form rules={validationRules} ref={form => (refForm = form)} action={handleSubmit}>
        <div className={createAccountStyles.closeButton} onClick={exitStage}>
          <div className={styles.exitgrayicon}/>
        </div>
        <div className={createAccountStyles.formtitle}>
          Choose a password.
        </div>
        <div className={createAccountStyles.passwordflex}/>
        <div className={createAccountStyles.flexer}/>

        <div className={createAccountStyles.usernameinputbox}>
          <Input type="password" name="password" required="required" autoFocus="autoFocus" className={createAccountStyles.usernameinput} placeholder="Password?"/>

          <Input type="password" name="password2" required="required" className={createAccountStyles.usernameinput} placeholder="Confirm password"/>
        </div>
        <div className={createAccountStyles.dialogiconbox}>
          <div tabIndex="2" className={[styles.iconbuttonbig, createAccountStyles.confirm].join(" ")} onClick={() => handleClick()}>
            <div className={styles.nextblueicon}/>
          </div>
        </div>
      </Form>
    </FormProvider>
  </div>);
}

export default ChoosePassword;
