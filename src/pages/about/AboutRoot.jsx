import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// Sub-pages
import AboutKurate from './pages/AboutKurate';

// Ids
const aboutKurate = 'aboutKurate';

export function AboutRoot() {
    const history = useHistory()

    const [stage, setStage] = useState(aboutKurate)

    // Router
    switch (stage) {
        case aboutKurate:
            return (
                <AboutKurate
                    nextStage={() => history.push("/home")}
                />
            );

        default:
            return <h1>Oops...</h1>;
    }
}

export default AboutRoot;
