import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Sub-pages
import UploadPhoto from './pages/UploadPhoto';

// Ids
const uploadPhoto = 'uploadPhoto';

export function PostItemRoot() {

    const [stage, setStage] = useState(uploadPhoto)

    // Router
    switch (stage) {
        case uploadPhoto:
            return (
                <UploadPhoto
                    nextStage={() => setStage()}
                />
            );

        default:
            return <h1>Oops...</h1>;
    }
}

export default PostItemRoot;
