import React from "react"
import { Route, NavLink } from "react-router-dom";
import { FormProvider, Form, Field } from "react-advanced-form";
import { useDispatch, useSelector } from "react-redux";
import { createAccount } from "../../../services/account/actions"
import { Button, Fab, Divider, Paper, TextField, Typography } from "@material-ui/core"
import { Done, Home } from "@material-ui/icons"
import { Input } from "react-advanced-form-addons"

import main from "../../../styles.module.css"
import accountstyles from "../account-create.module.css"

export function AccountView({ account, nextStage }) {


    return (
        <div className={accountstyles.container}>
            <div className={main.titlebox}>
                <Typography className={main.subtitle} variant="button">
                    INSTASWARM
                </Typography>
                <Typography
                    color="secondary"
                    className={main.title}
                    variant="h4"
                >
                    Create Account
                    </Typography>
                <Home className={main.close} />
            </div>
            <div className={main.margin}>
                <Divider />
            </div>

            <div>
                {account.accountName}
            </div>
            <div>
                {account.address}
            </div>
            <div>
                {account.privateKey}
            </div>
            <div>
                {account.passWord}
            </div>


            <div className={main.margin}>
                <Divider />
            </div>


        </div>
    );
}

export default AccountView;
