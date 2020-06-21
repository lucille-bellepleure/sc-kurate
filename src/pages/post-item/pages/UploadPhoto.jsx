import React, { useState, useRef, useCallback } from "react"
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css';
import main from "styles.module.css"
import { Route, NavLink } from "react-router-dom";
import Placeholder from "images/placeholder.png"
export function UploadPhoto({ nextStage, setPhoto }) {

    const [filesState, setFilesState] = useState({
        filedata: Placeholder
    });
    const fileUploadRef = useRef(null);
    let cropperRef = useRef(null);

    console.log(filesState)

    const handleFileUpload = (e) => {
        const files = e.target.files
        const reader = new FileReader();
        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = (file) => {
            const binaryStr = reader.result;
            const _id = new Date().toISOString();
            const fileTemp = {
                _id: _id,
                filename: fileName,
                filedata: binaryStr,
            };
            setFilesState(fileTemp);
        };
        const fileName = files[0].name;
        reader.readAsDataURL(files[0]);
    }

    const processImage = () => {
        const photo = cropperRef.getCroppedCanvas({ maxWidth: 480, maxHeight: 480 }).toDataURL();
        setPhoto(photo);
        nextStage();
    }

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        console.log(croppedArea, croppedAreaPixels)
    }, [])

    return (
        <div className={main.container}>
            <div className={main.header}>
                <div><NavLink className={main.textbutton} to="/">Cancel</NavLink></div>
                <div onClick={() => processImage()} className={[main.blue, main.bodyBold, main.textbutton].join(" ")}>Next</div>
            </div>
            <div className={main.photoplace}>
                <Cropper
                    ref={cropper => { cropperRef = cropper }}
                    src={filesState.filedata}
                    className={main.cropper}                    // Cropper.js options
                    viewMode={3}
                    aspectRatio={1 / 1}
                    guides={true}
                    cropBoxMovable={false}
                    cropBoxResizable={false}
                    dragMode="move"
                    toggleDragModeOnDblclick={false}></Cropper>
            </div>
            <label htmlFor="upload-button">
                <div className={main.iconbuttonbig}>
                    <div className={main.plusicon}></div>
                </div>
            </label>
            <input type="file"
                id="upload-button"
                hidden onChange={handleFileUpload} />
        </div >
    );
}

export default UploadPhoto;