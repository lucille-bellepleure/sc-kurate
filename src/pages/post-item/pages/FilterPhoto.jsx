import React, { useState, useRef, useCallback } from "react"
import main from "styles.module.css"
import { Route, NavLink } from "react-router-dom";

export function FilterPhoto({ nextStage, setFilteredPhoto, image }) {
    const [testimage, settestimage] = useState();

    const [filterclass, setFilterclass] = useState("1977");
    const cssgram_filters = [
        "1977",
        "aden",
        "brannan",
        "brooklyn",
        "clarendon",
        "earlybird",
        "gingham",
        "hudson",
        "inkwell",
        "kelvin",
        "lark",
        "lofi",
        "maven",
        "mayfair",
        "moon",
        "nashville",
        "perpetua",
        "reyes",
        "rise",
        "slumber",
        "stinson",
        "toaster",
        "valencia",
        "walden",
        "willow",
        "xpro2"
    ]

    const cssco_filters = [
        "cssco cssco--c1",
        "cssco cssco--f2",
        "cssco cssco--g3",
        "cssco cssco--p5",
        "cssco cssco--hb1",
        "cssco cssco--hb2",
        "cssco cssco--acg",
        "cssco cssco--lv3",
        "cssco cssco--m5",
        "cssco cssco--a6",
        "cssco cssco--kk2",
        "cssco cssco--m3",
        "cssco cssco--t1",
        "cssco cssco--b5",
        "cssco cssco--x1"
    ]

    const handleFilteredPhoto = () => {
        var ctx = canvasRef.current.toDataURL('image/png', 1.0);

        console.log(ctx);
        //setFilteredPhoto(ctx);
        //nextStage();
        settestimage(ctx)
    }

    var divStyle = {
        backgroundImage: 'url(' + image + ')'
    }


    const canvasRef = React.useRef(null)

    // const caman = Caman(canvasRef, image, function () {
    //     this.brightness(10).render();
    // })

    return (
        <div className={main.container}>
            <div className={main.header}>
                <div><NavLink className={main.textbutton} to="/">Cancel</NavLink></div>
                <div onClick={() => { handleFilteredPhoto() }} className={[main.blue, main.bodyBold, main.textbutton].join(" ")}>Next</div>
            </div>
            <img src={testimage}></img>
            <canvas width="100%"
                ref={canvasRef}
                className={main.photoplace} class={filterclass} style={divStyle}>
            </canvas>
            <div className={main.filterplace}>
                {cssgram_filters.map((filter) => (
                    <div
                        className={main.filteritem}
                        onClick={() => setFilterclass(filter)}
                    >
                        <div>{filter}</div>
                        <img
                            class={filter}
                            src={image}
                            width={120}
                            height={120}
                        >
                        </img>
                    </div>
                ))}

            </div>
        </div>
    );
}

export default FilterPhoto;