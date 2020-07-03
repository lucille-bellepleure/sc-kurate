import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Sub-pages
import HomeFeed from './pages/HomeFeed';

// Ids
const homeFeed = 'homeFeed';

function getHomefeed(state) {
    return state.homefeed
}

export function HomeFeedRoot() {

    const dispatch = useDispatch()

    const [stage, setStage] = useState(homeFeed)
    const homefeed = useSelector(state => getHomefeed(state))


    // Router
    switch (stage) {
        case homeFeed:
            return (
                <HomeFeed
                    homefeed={homefeed}
                    nextStage={() => setStage()}
                />
            );

        default:
            return <h1>Oops...</h1>;
    }
}

export default HomeFeedRoot;
