import React, { useState, useRef, useCallback } from "react"
import Cropper from 'react-easy-crop'
import main from "../../../styles.module.css"
import { Route, NavLink } from "react-router-dom";

export function UploadPhoto({ nextStage }) {

    const [filesState, setFilesState] = useState({
        filedata: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAeAA…DYNAAGDSAQQNg0AAGDcCVBYT1Br02Pnj1AAAAAElFTkSuQmCC"
    });
    const fileUploadRef = useRef(null);
    const cropperRef = useRef(null);

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
        const canvas = cropperRef.current;
        const ctx = canvas.getContext('2d')
        console.log(ctx)
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
            <label htmlFor="upload-button">
                <div className={main.photoplace}>
                    <Cropper
                        ref={cropperRef}
                        className={main.cropper}
                        image={filesState.filedata}
                        crop={crop}
                        showGrid
                        style={{ containerStyle: {} }}
                        zoom={zoom}
                        aspect={1 / 1}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        cropSize={{ width: 480, height: 480 }}
                        maxZoom={6}
                    />
                </div>
                <div className={main.filterplace}>
                    <div className={main.iconbuttonbig}>
                        <div className={main.plusicon}></div>
                    </div>
                </div>
            </label>
            <input type="file"
                id="upload-button"
                hidden onChange={handleFileUpload} />
        </div>
    );
}

export default UploadPhoto;