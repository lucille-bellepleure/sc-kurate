import React from "react";
import main from "../styles.module.css"
import { Player } from "video-react"


function PosterChild({ image, format }) {
    console.log(image, format)
    switch (format) {
        case 'video':
            return (
                <Player autoPlay loop playsInline muted width="100%" src={require("../images/" + image)}>
                </Player>
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
