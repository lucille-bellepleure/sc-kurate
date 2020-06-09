import React from "react";
import main from "../styles.module.css"

function PosterChild({ image, format }) {
    console.log(image, format)
    switch (format) {
        case 'video':
            return (
                <video src={require("../images/" + image)} autoplay type="video/mp4" controls width="100%" />
            )
        case 'image':
            return (
                <img className={main.image} width="100%" src={require("../images/" + image)}></img>
            )

        default:
            return null
    }
}

export default PosterChild;
