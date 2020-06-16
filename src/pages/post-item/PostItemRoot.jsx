import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Sub-pages
import UploadPhoto from './pages/UploadPhoto';
import FilterPhoto from './pages/FilterPhoto';
// Ids
const uploadPhoto = 'uploadPhoto';
const filterPhoto = 'filterPhoto';

export function PostItemRoot() {

    const [stage, setStage] = useState(uploadPhoto)
    const [photo, setPhoto] = useState()

    // Router
    switch (stage) {
        case uploadPhoto:
            return (
                <UploadPhoto
                    nextStage={() => setStage(filterPhoto)}
                    setPhoto={setPhoto}
                />
            );
        case filterPhoto:
            return (
                <FilterPhoto
                    image={photo}>
                </FilterPhoto>
            )

        default:
            return <h1>Oops...</h1>;
    }
}

export default PostItemRoot;
