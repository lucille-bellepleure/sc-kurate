import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Sub-pages
import HashtagList from './pages/HashtagList';

// Ids
const hashtagList = 'hashtagList';

export function HashtagRoot() {

    const [stage, setStage] = useState(hashtagList)

    // Router
    switch (stage) {
        case hashtagList:
            return (
                <HashtagList
                    nextStage={() => setStage()}
                />
            );

        default:
            return <h1>Oops...</h1>;
    }
}

export default HashtagRoot;
