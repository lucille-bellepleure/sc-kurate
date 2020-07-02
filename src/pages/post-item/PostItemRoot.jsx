import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Sub-pages
import UploadPhoto from './pages/UploadPhoto';
import FilterPhoto from './pages/FilterPhoto';
import MetaDataPhoto from './pages/MetaDataPhoto';

// Ids
const uploadPhoto = 'uploadPhoto';
const filterPhoto = 'filterPhoto';
const metadataPhoto = 'metadataPhoto';

function getUser(state) {
    return state.account
}

export function PostItemRoot() {

    const dispatch = useDispatch()
    const account = useSelector(state => getUser(state))
    const [stage, setStage] = useState(uploadPhoto)
    const [photo, setPhoto] = useState()
    const [filteredPhoto, setFilteredPhoto] = useState()

    const sharePost = (post) => {
        const dataObject = { post: post, user: account }
        dispatch({ type: "SHARE_POST", data: dataObject })
    }

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
                    image={photo}
                    nextStage={() => setStage(metadataPhoto)}
                    setFilteredPhoto={setFilteredPhoto}>
                </FilterPhoto>
            );
        case metadataPhoto:
            return (
                <MetaDataPhoto
                    image={filteredPhoto}
                    sharePost={sharePost}>
                </MetaDataPhoto>
            )

        default:
            return <h1>Oops...</h1>;
    }
}

export default PostItemRoot;
