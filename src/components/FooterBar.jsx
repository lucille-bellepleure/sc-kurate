// The Footer Bar
import React from 'react'
import main from '../styles.module.css'
import { NavLink } from 'react-router-dom'
import { Add, HomeRounded } from '@material-ui/icons'

function FooterBar ({ account }) {
    return <div className={main.footer}>
    <div className={main.textbutton}>
        <NavLink to="/home">
            <HomeRounded color="primary" fontSize="large"></HomeRounded>
        </NavLink>
    </div>
    <div className={main.textbutton}>
        {account.status === 'noAccount' ? (
            <NavLink to="/create-account">
                <Add color="primary" fontSize="large"></Add>
                {/* <div className={main.iconbuttonbig}>
                <div className={main.plusicon}></div>
            </div> */}
            </NavLink>
        ) : (
            <NavLink to="/post-item">
                <Add color="primary" fontSize="large"></Add>
                {/* <div className={main.iconbuttonbig}>
                <div className={main.plusicon}></div>
            </div> */}
            </NavLink>
        )}
    </div>
    <div className={main.textbutton}>
        {account.status === 'noAccount' ? (
            <NavLink to="/create-account">
                <img className={main.avatarImage} src={account.avatar}></img>
            </NavLink>
        ) : (
            <NavLink to="/account">
                <img className={main.avatarImage} src={account.avatar}></img>
            </NavLink>
        )}
    </div>
</div>
}

export default FooterBar
