import React from "react";
import main from "../styles.module.css"
import { Player } from "video-react"


function PosterChild({ image, format }) {
    //console.log(image, format)
    switch (format) {
        case 'video':
            return (
                <div className={main.video}>
                    <Player autoPlay loop playsInline muted width="100%" src={require("../images/" + image)}>
                    </Player>
                </div>
            )
        case 'image':
            return (
                <img className={main.image} alt="A Kurate Post" width="100%" src={image}></img>
            )
        default:
            return null
    }
}

export default PosterChild;
