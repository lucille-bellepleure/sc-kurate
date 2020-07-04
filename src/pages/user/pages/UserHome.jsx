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

export function UserHome({ nextStage, user, userfeed, usersubs, account }) {

    return (
        <ThemeProvider theme={theme}>
            <div className={main.container}>
                <div className={main.header}>
                    <div><NavLink className={main.textbutton} to="/"><ArrowBackIos color="primary"></ArrowBackIos></NavLink></div>
                    <div className={[main.textbutton, main.bodyDefault, main.blue].join()}>{user.account.username}</div>
                    <div>&nbsp;</div>
                </div>
                <div className={styles.usersection}>
                    <img className={styles.avatarImage} src={user.account.useravatar} alt="avatar" />
                    <div className={styles.followingContainer}>
                        <div className={styles.followingItem}>
                            <div className={styles.followingNumber}>{userfeed.length}</div>
                            <div className={styles.followingLabel}>Posts</div>
                        </div>
                        <div className={styles.followingItem} onClick={nextStage}>
                            <div className={styles.followingNumber}>{usersubs.length}</div>
                            <div className={styles.followingLabel}>Following </div>
                        </div>
                    </div>

                    <div>
                        <div className={styles.userName}>{user.account.username}</div>
                        <div className={styles.userAddress}>{user.account.address}</div>
                    </div>
                </div>

                <div className={styles.scroller}>
                    {userfeed.map((item) => (
                        <img className={styles.postImage} src={item.image}></img>
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
        </ThemeProvider>
    );
}

export default UserHome;