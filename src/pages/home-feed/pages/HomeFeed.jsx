import React, { useState, useRef, useCallback } from "react"

import { useSelector, useDispatch } from "react-redux"
import main from "styles.module.css"
import { Route, NavLink } from "react-router-dom";
import { Home, AddCircle, ArrowForwardIos, Favorite, FavoriteBorder, Person, PlayCircleFilledWhite } from '@material-ui/icons';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Avatar, Divider } from "@material-ui/core"
import ActionButton from "components/ActionButton"
import PosterChild from "components/PosterChild"

const theme = createMuiTheme({
    // Style sheet name ⚛️
    palette: {
        primary: { main: '#333333' },
        secondary: { main: '#f55858' },
    }
});

function getUser(state) {
    return state.account
}

export function HomeFeed({ nextStage, homefeed }) {

    const account = useSelector(state => getUser(state))
    const dispatch = useDispatch()

    return (
        <ThemeProvider theme={theme}>

            <div className={main.container}>
                <div className={main.header}>
                    <img src={require("../../../images/logo-transparent-D.png")}></img>
                    {/* <div className={main.logo}></div> */}
                </div>
                <div className={main.scroller}>
                    {homefeed.map((item) => (
                        <div>
                            <div className={main.postHead}>
                                <Avatar src={require("../../../images/" + item.avatar)} className={main.avatar}></Avatar>
                                <div>
                                    <div className={main.postUsername}><b>{item.user}</b></div>
                                    <div className={main.postLocation}>{item.location}</div>
                                </div>
                            </div>
                            <PosterChild format={item.format} image={item.image} onDoubleClick={() => dispatch({ type: 'SET_LIKE', data: { _id: item._id, ilike: true } })}></PosterChild>

                            <ActionButton type={item.type}></ActionButton>
                            <div className={main.postFooter}>
                                <div className={main.likes}>
                                    {item.ilike
                                        ? <Favorite
                                            onClick={() => dispatch({ type: 'SET_LIKE', data: { _id: item._id, ilike: false } })} color="secondary" fontSize="small"></Favorite>
                                        : <FavoriteBorder
                                            onClick={() => dispatch({ type: 'SET_LIKE', data: { _id: item._id, ilike: true } })}
                                            color="primary" fontSize="small"></FavoriteBorder>
                                    }
                                    &nbsp;
                                    <b>{item.likes}</b></div>
                                <div>{item.description}</div>
                            </div>
                        </div>

                    ))}

                    <div>
                        <div className={main.feedEnd}>

                            <div>You're all caught up.</div>
                            <div className={main.blue}>Discover more topics</div>

                        </div>
                    </div>
                </div>
                <div className={main.footer}>
                    <div className={main.textbutton}>
                        <NavLink to="/"><Home color="primary" fontSize="large"></Home></NavLink>
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
                            <NavLink to="create-account">
                                <img className={main.avatarImage} src={account.avatar}></img>
                            </NavLink>
                            :
                            <NavLink to="account">
                                <img className={main.avatarImage} src={account.avatar}></img>
                            </NavLink>
                        }
                    </div>
                </div>

            </div>
        </ThemeProvider>
    );
}

export default HomeFeed;