import React, { useState } from "react";
import styles from "styles.module.css";
import createAccount from "../account.module.css";
import QRCode from "react-qr-code";


const MyIdentity = ({
    nextStage,
    exitStage,
    avatarStage,
    avatar,
    username,
    setUsername,
    publicKey = "",
    address = "",
    QR = true
}) => (
        <div className={createAccount.formcontainer}>
            <div className={createAccount.closeButton} onClick={exitStage}>
                <div className={styles.exitgrayicon} />
            </div>
            <div className={createAccount.placeholder}>
                <img className={createAccount.avatarImage} src={avatar} alt="avatar" />
            </div>
            <div className={createAccount.uploadbtn} />
            <div className={createAccount.uploadicon} onClick={avatarStage}>
                <div className={createAccount.arrowup} />
            </div>
            <div className={createAccount.usernameinputbox}>
                <input
                    className={createAccount.usernameinput}
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
            </div>
            <div>
                <QRCode size="128" value={address}></QRCode>
            </div>
            {/* <div onClick={() => } className={createAccount.showkeystoggle}>show publicKey</div> */}
            <div className={createAccount.flexer} />
            <div onClick={nextStage} className={createAccount.removeButton}>Remove account</div>
        </div>
    );

export default MyIdentity;
