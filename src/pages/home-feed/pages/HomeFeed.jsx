import React, { useState, useRef, useCallback } from "react"
import main from "../../../styles.module.css"
import { Route, NavLink } from "react-router-dom";
import { Home, Add, ArrowForwardIos, FavoriteBorder, Person, PlayCircleFilledWhite } from '@material-ui/icons';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Avatar, Divider } from "@material-ui/core"
import ActionButton from "../../../components/ActionButton"
import PosterChild from "../../../components/PosterChild"

const theme = createMuiTheme({
    // Style sheet name ⚛️
    palette: {
        primary: { main: '#ffffff' },
        secondary: { main: '#666666' }
    }
});

export function HomeFeed({ nextStage, homefeed }) {

    return (
        <ThemeProvider theme={theme}>

            <div className={main.container}>
                <div className={main.header}>
                    <img src={require("../../../images/logo-transparent-Y.png")}></img>
                </div>
                <div className={main.scroller}>
                    {homefeed.map((item) => (
                        <div>
                            <div className={main.postHead}>
                                <Avatar src={require("../../../images/defaultAvatar.png")} className={main.avatar}></Avatar>
                                <div>
                                    <div className={main.postUsername}><b>{item.user}</b></div>
                                    <div className={main.postLocation}>{item.location}</div>
                                </div>
                            </div>
                            <PosterChild format={item.format} image={item.image}></PosterChild>

                            <ActionButton type={item.type}></ActionButton>
                            <div className={main.postFooter}>
                                <div className={main.likes}><FavoriteBorder fontSize="small"></FavoriteBorder>&nbsp;
                                    <b>{item.likes}</b></div>
                                <div>{item.description}</div>
                            </div>
                        </div>

                    ))}

                    <div>
                        <div className={main.feedEnd}>

                            <div>You're all caught up.</div>
                            <div className={main.yellow}>Discover more</div>

                        </div>
                    </div>
                </div>
                <div className={main.footer}>
                    <div className={main.textbutton}>
                        <NavLink to="/"><Home color="primary" fontSize="medium"></Home></NavLink>
                    </div>
                    <div className={main.textbutton}>
                        <NavLink to="/post-item"><Add color="primary" fontSize="large"></Add></NavLink>
                    </div>
                    <div className={main.textbutton}><Person color="primary" fontSize="medium"></Person></div>
                </div>

            </div>
        </ThemeProvider>
    );
}

export default HomeFeed;