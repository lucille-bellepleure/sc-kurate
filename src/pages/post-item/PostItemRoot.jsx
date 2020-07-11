import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

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

function getSystem(state) {
    return state.system
}
export function PostItemRoot() {

    const history = useHistory()

    const dispatch = useDispatch()
    const account = useSelector(state => getUser(state))
    const system = useSelector(state => getSystem(state))

    const [stage, setStage] = useState(uploadPhoto)
    const [photo, setPhoto] = useState()
    const [filteredPhoto, setFilteredPhoto] = useState()

    const sharePost = (post) => {
        if (!system.passWord) {
            dispatch({ type: "SET_SYSTEM", data: { showPasswordUnlock: true } })
        } else {
            const dataObject = { post: post, user: account, password: system.passWord }
            dispatch({ type: "SHARE_POST", data: dataObject })
            history.push("/")
        }
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
                    sharePost={sharePost}
                    accountUnlock={system.passWord}>
                </MetaDataPhoto>
            )

        default:
            return <h1>Oops...</h1>;
    }
}

export default PostItemRoot;
