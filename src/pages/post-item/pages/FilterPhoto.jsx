import React, { useState, useRef, useCallback } from "react"
import main from "styles.module.css"
import { Route, NavLink } from "react-router-dom";

export function FilterPhoto({ nextStage, image }) {

    const [filterclass, setFilterclass] = useState("1977");
    const filters = [
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

    return (
        <div className={main.container}>
            <div className={main.header}>
                <div><NavLink className={main.textbutton} to="/">Cancel</NavLink></div>
                <div onClick={() => { }} className={[main.blue, main.bodyBold, main.textbutton].join(" ")}>Next</div>
            </div>
            <div className={main.photoplace}>
                <img class={filterclass} src={image}></img>
            </div>
            <div className={main.filterplace}>
                {filters.map((filter) => (
                    <div
                        className={main.filteritem}
                        onClick={() => setFilterclass(filter)}
                    >
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