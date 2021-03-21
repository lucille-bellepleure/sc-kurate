import React, { useState } from 'react';
import { Route, NavLink } from "react-router-dom";
import pages from "./pages";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "@material-ui/core";
import { Input } from 'react-advanced-form-addons'

function getSystem(state) {
  return state.system
}

function getAccount(state) {
  return state.account
}

function App() {

  const system = useSelector(state => getSystem(state))
  const account = useSelector(state => getAccount(state))
  const dispatch = useDispatch()

  const [password, setPassword] = useState()

  const handleSetPassword = (e) => {
    setPassword(e.target.value)
  }


  return (
    <div className={styles.swarmcity}>
      {pages.map(({ path, exact, component }) => (
        <Route key={path} {...{ path, exact, component }} />
      ))}
      <Dialog
        open={system.showPasswordUnlock}>
        <div className={styles.dialogBox}>
          <div className={styles.dialogClose}>
            <div className={styles.closeButton} onClick={() => dispatch({ type: 'SET_SYSTEM', data: { showPasswordUnlock: false } })}>
              <div className={styles.exitgrayicon} />
            </div>
          </div>
          <img src={account.avatar} className={styles.dialogAvatar}></img>
          <div className={styles.dialogPasswordBox}>
            <input className={styles.dialogPassword} type="password" placeholder="Password" onChange={(e) => handleSetPassword(e)}></input>
          </div>
          <div className={styles.dialogPasswordiconbox}>
            <div
              onClick={() => dispatch({ type: 'SET_SYSTEM', data: { showPasswordUnlock: false } })}
              className={[styles.iconbuttonbig, styles.cancel].join(" ")}
            >
              <div className={styles.xmarkicon} />
            </div>
            <div
              tabIndex="2"
              onClick={() => dispatch({ type: 'SET_SYSTEM', data: { showPasswordUnlock: false, passWord: password } })}
              className={[styles.iconbuttonbig, styles.confirm].join(" ")}
            >
              <div className={styles.nextblueicon} />
            </div>
          </div>
        </div>
      </Dialog>
    </div >

  );
}

export default App;
