import React, { useState, useEffect, useRef, useCallback } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import main from "styles.module.css";
import { Route, NavLink } from "react-router-dom";
import Placeholder from "images/dummy_kev.png";
export function UploadPhoto({ nextStage, setPhoto }) {
  const [filesState, setFilesState] = useState({ filedata: Placeholder });

  const fileUploadRef = useRef(null);
  let cropperRef = useRef(null);

  console.log(filesState);

  const handleFileUpload = e => {
    const files = e.target.files;
    const reader = new FileReader();
    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = file => {
      const binaryStr = reader.result;
      const _id = new Date().toISOString();
      const fileTemp = {
        _id: _id,
        filename: fileName,
        filedata: binaryStr
      };
      setFilesState(fileTemp);
      cropperRef.cropper.scale(1)
      debugger

    };
    const fileName = files[0].name;
    reader.readAsDataURL(files[0]);
  };

  const processImage = async () => {

    let photo = await cropperRef.cropper.getCroppedCanvas({
      minWidth: 420,
      minHeight: 420,
      maxWidth: 800,
      maxHeight: 800,
      fillColor: "#fff",
      imageSmoothingEnabled: true,
      imageSmoothingQuality: "high"
    }).toDataURL();
    //const photo = cropperRef.getImageScaledToCanvas({width: 750, height: 750}).toDataURL();
    //let dimensions = cropperRef.getCroppingRect();
    //console.log(dimensions);
    //let image = cropperRef.getImage();
    // const canvas = cropperRef.getImage();
    // console.log(canvas);
    // var ctx = canvas.getContext("2d");
    // console.log(ctx);
    // let photonImage = window.photon.open_image(canvas, ctx);
    // window.photon.grayscale(photonImage);
    // let resized = window.photon.resize(photonImage, 25, 25, 2);
    // let ctx2 = resized.getContext("2d");
    // let resizedPhotonImage = window.photon.open_image(resized, ctx2);
    // debugger;
    // window.photon.putImageData(resized, ctx2, photonImage);
    //var file = resized.toDataURL("image/png", 1.0);
    //setFilesState({filedata: file});
    setPhoto(photo);
    nextStage();
  };

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [position, setPosistion] = useState({ x: 0.5, y: 0.5 });

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  }, []);

  const rotateImage = () => {
    cropperRef.cropper.rotate(90)
  }

  return (<div className={main.container}>
    <div className={main.header}>
      <div>
        <NavLink className={[main.textbutton, main.gray].join(" ")} to="/">
          Cancel
        </NavLink>
      </div>
      <div onClick={() => processImage()} className={[main.blue, main.bodyBold, main.textbutton].join(" ")}>
        Next
      </div>
    </div>
    {/* <div className={main.aspectratiowrapper}>
      <div className={main.aspectratiodiv}></div>
    </div> */
    }
    <div className={main.photoplace}>
      <Cropper ref={cropper => {
        cropperRef = cropper;
      }} src={filesState.filedata} className={main.cropper} viewMode={1} modal={false} autoCrop={true} background={false} initialAspectRatio={1 / 1} aspectRatio={1 / 1} guides={true} cropBoxMovable={false} cropBoxResizable={false} dragMode="move" toggleDragModeOnDblclick={false}></Cropper>
    </div>

    <div className={main.filterplace}>
      <div onClick={() => rotateImage()}>Rotate +90</div>
      <label htmlFor="upload-button">
        <div className={main.dialogiconbox}>
          <div className={main.iconbuttonbigblue}>
            <div className={main.plusicon}></div>
          </div>
        </div>
      </label>
      <input type="file" id="upload-button" hidden="hidden" onChange={handleFileUpload} />
    </div>
  </div>);
}

export default UploadPhoto;