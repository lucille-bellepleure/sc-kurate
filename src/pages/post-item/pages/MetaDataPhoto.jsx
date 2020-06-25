import React, { useState, useRef, useCallback } from "react"
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css';
import main from "styles.module.css"
import { Route, NavLink } from "react-router-dom";
import Placeholder from "images/placeholder.png"
export function MetaDataPhoto({ nextStage, image }) {


    return (
        <div className={main.container}>
            <div className={main.header}>
                <div><NavLink className={main.textbutton} to="/">Cancel</NavLink></div>
            </div>
            <div className={main.photoplace}>
                <img src={image}></img>
            </div>

        </div >
    );
}

export default MetaDataPhoto;