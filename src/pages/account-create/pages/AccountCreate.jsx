import React from "react"
import { Route, NavLink } from "react-router-dom";
import { FormProvider, Form, Field } from "react-advanced-form";
import { useDispatch, useSelector } from "react-redux";
import { createAccount } from "../../../services/account/actions"
import { Button, Fab, Divider, Paper, TextField, Typography } from "@material-ui/core"
import { Done, Home } from "@material-ui/icons"
import { Input } from "react-advanced-form-addons"

import main from "../../../Main.module.css"
import accountstyles from "../account-create.module.css"

export function AccountCreate({ nextStage }) {
    const dispatch = useDispatch();

    const handleSubmit = ({ serialized, fields, form }) => {
        console.log(serialized)
        dispatch(createAccount({
            accountname: serialized.accountname,
            password: serialized.password
        }))
    }

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
                <FormProvider>
                    <Form action={handleSubmit}>
                        <div>
                            <Input name="accountname" label="Account name"></Input>
                        </div>
                        <div>
                            <Input name="password" label="Password" type="password"></Input>
                        </div>
                        <div>
                            <Input name="passwordcheck" label="Password check" type="password"></Input>
                        </div>
                        <div className={main.margin}>
                            <Button type="submit"
                                className={accountstyles.button} color="secondary" variant="contained">Create account</Button>
                        </div>
                    </Form>
                </FormProvider>
            </div>

            <div className={main.margin}>
                <Divider />
            </div>


        </div>
    );
}

export default AccountCreate;
