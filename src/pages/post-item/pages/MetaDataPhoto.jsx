import React, { useState, useRef, useCallback } from "react"
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css';
import main from "styles.module.css"
import { Route, NavLink } from "react-router-dom";
import Placeholder from "images/placeholder.png"
export function MetaDataPhoto({ nextStage, sharePost, image }) {

    const [textInput, setTextInput] = useState()

    const handlePost = () => {
        sharePost({ image: image, caption: textInput })
    }

    return (
        <div className={main.container}>
            <div className={main.header}>
                <div><NavLink className={main.textbutton} to="/">Cancel</NavLink></div>
                <div onClick={() => { handlePost() }} className={[main.blue, main.bodyBold, main.textbutton].join(" ")}>Share</div>
            </div>
            <div className={main.photoplace}>
                <div className={main.metaContainer}>
                    <img src={image} width="100" height="100"></img>
                    <textarea
                        type="text"
                        autoFocus
                        multiline
                        rows="4"
                        maxlength="78"
                        className={main.textinput}
                        value={textInput}
                        placeholder="Write a caption..."
                        onChange={e => setTextInput(e.target.value)}
                    />
                </div>
            </div>

        </div >
    );
}

export default MetaDataPhoto;