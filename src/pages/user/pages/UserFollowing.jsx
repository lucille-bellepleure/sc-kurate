import React, { useEffect, useState, useRef, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import main from "styles.module.css"
import styles from "../user.module.css"
import { useParams, Route, NavLink } from "react-router-dom";
import { Home, AddCircle, ArrowBackIos, ArrowForwardIos, Favorite, FavoriteBorder, Person, PlayCircleFilledWhite } from '@material-ui/icons';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Avatar, Divider } from "@material-ui/core"
import sortByProp from "helpers/sortByProp";

const theme = createMuiTheme({
    // Style sheet name ⚛️
    palette: {
        primary: { main: '#333333' },
        secondary: { main: '#f55858' },
    }
});

export function UserFollowing({ nextStage, exitStage, user, userfeed, usersubs, account }) {

    return (
        <ThemeProvider theme={theme}>
            <div className={main.container}>
                <div className={main.header}>
                    <div onClick={exitStage}><ArrowBackIos color="primary"></ArrowBackIos></div>
                    <div className={[main.textbutton, main.bodyDefault, main.blue].join()}>{user.account.username}</div>
                    <div>&nbsp;</div>
                </div>
                <div className={styles.followingList}>
                    {usersubs.map((item) => (
                        <div className={styles.followingListItem}>
                            <img className={styles.followingListAvatar} src={item.avatar} alt="avatar" />
                            <div>
                                <div className={styles.userName}>{item.username}</div>
                                <div className={styles.userAddress}>{item.address}</div>
                            </div>
                        </div>
                    ))}

                </div>
                <div className={main.footer}>
                    <div className={main.textbutton}>
                        <NavLink to="/">
                            <Home

                                color="primary"
                                fontSize="large"></Home>
                        </NavLink>
                    </div>
                    <div className={main.textbutton}>
                        {account.status === "noAccount" ?
                            <NavLink to="/create-account">
                                <AddCircle color="primary" fontSize="large"></AddCircle>
                                {/* <div className={main.iconbuttonbig}>
                                <div className={main.plusicon}></div>
                            </div> */}
                            </NavLink>
                            :
                            <NavLink to="/post-item">
                                <AddCircle color="primary" fontSize="large"></AddCircle>
                                {/* <div className={main.iconbuttonbig}>
                                <div className={main.plusicon}></div>
                            </div> */}
                            </NavLink>
                        }

                    </div>
                    <div className={main.textbutton}>
                        {account.status === "noAccount" ?
                            <NavLink to="/create-account">
                                <img className={main.avatarImage} src={account.avatar}></img>
                            </NavLink>
                            :
                            <NavLink to="/account">
                                <img className={main.avatarImage} src={account.avatar}></img>
                            </NavLink>
                        }
                    </div>
                </div>
            </div>
        </ThemeProvider >
    );
}

export default UserFollowing;