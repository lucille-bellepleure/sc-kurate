import React, {useEffect, useState, useRef, useCallback} from "react";
import main from "styles.module.css";
import {Route, NavLink} from "react-router-dom";
import ProcessImage from "react-imgpro";

export function FilterPhoto({nextStage, setFilteredPhoto, image}) {
  let myCaman = null;
  const [thumbs, setThumbs] = useState([
    {
      filter: "vintage",
      src: image
    }
  ]);
  console.log(thumbs);

  const [img, setImg] = useState();
  const canvasRef = useRef(null);
  const thumbCanvasRef = useRef(null);
  const [currentFilter, setCurrentFilter] = useState("vintage");

  const filterMap = [
    {
      filter: "oceanic"
    }, {
      filter: "islands"
    }, {
      filter: "marine"
    }, {
      filter: "seagreen"
    }, {
      filter: "flagblue"
    }, {
      filter: "diamante"
    }, {
      filter: "liquid"
    }, {
      filter: "radio"
    }, {
      filter: "twenties"
    }, {
      filter: "rosetint"
    }, {
      filter: "mauve"
    }, {
      filter: "bluechrome"
    }, {
      filter: "vintage"
    }, {
      filter: "perfume"
    }, {
      filter: "serenity"
    }, {
      filter: "golden"
    }, {
      filter: "pastel_pink"
    }, {
      filter: "cali"
    }, {
      filter: "dramatic"
    }, {
      filter: "firenze"
    }, {
      filter: "obsidian"
    }, {
      filter: "lofi"
    }
  ];

  const handleFilteredPhoto = () => {
    var file = canvasRef.current.toDataURL("image/png", 1.0);
    //console.log(file);
    setFilteredPhoto(file);
    nextStage();
  };

  const changeEffect = effect => {
    let ctx = canvasRef.current.getContext("2d");
    let img = new Image();
    img.src = image;
    canvasRef.current.width = img.width;
    canvasRef.current.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);

    // myCaman = window.Caman(canvasRef.current, img, function () {
    //   this.render(function () {
    //     setImg(this.toBase64());
    //   });
    // });
    // console.log(myCaman);

    let photonImage = window.photon.open_image(canvasRef.current, ctx);

    // Filter the image
    window.photon.filter(photonImage, effect);
    //window.photon.transform.resize(photonImage, 10, 10, 4);

    // Replace the current canvas' ImageData with the new image's ImageData.
    window.photon.putImageData(canvasRef.current, ctx, photonImage);
  };

  const createThumbs = async () => {
    for (let index = 0; index < filterMap.length; index++) {
      const filter = filterMap[index];
      let ctx = canvasRef.current.getContext("2d");
      let photonImage = window.photon.open_image(canvasRef.current, ctx);

      await window.photon.filter(photonImage, filter.filter);
      let imageData = window.photon.to_image_data(photonImage);
      console.log(imageData);

      let canvas2 = document.createElement("canvas");
      let ctx2 = canvas2.getContext("2d");
      canvas2.width = imageData.width;
      canvas2.height = imageData.height;
      ctx2.putImageData(imageData, 0, 0);

      let thumb64 = canvas2.toDataURL();
      //let thumbCanvas = await window.photon.putImageData(canvas, ctx2, photonImage);
      //let thumb64 = canvas.toDataURL();
      setThumbs(thumbs => [
        ...thumbs, {
          filter: filter.filter,
          src: thumb64
        }
      ]);

      //   const thumbSrc = window.Caman(canvas, image, function () {
      //     this[filter.filter]();
      //     this.render(function () {
      //       let base64 = this.toBase64();
      //       setThumbs(thumbs => [
      //         ...thumbs, {
      //           filter: filter.filter,
      //           src: base64
      //         }
      //       ]);
      //     });
      //   });
    }
  };

  useEffect(() => {
    console.log(canvasRef.current);
    let ctx = canvasRef.current.getContext("2d");
    let img = new Image();
    img.src = image;
    canvasRef.current.width = img.width;
    canvasRef.current.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);

    // myCaman = window.Caman(canvasRef.current, img, function () {
    //   this.render(function () {
    //     setImg(this.toBase64());
    //   });
    // });
    // console.log(myCaman);

    let photonImage = window.photon.open_image(canvasRef.current, ctx);

    // Filter the image
    window.photon.filter(photonImage, "islands");
    //window.photon.transform.resize(photonImage, 10, 10, 4);

    // Replace the current canvas' ImageData with the new image's ImageData.
    window.photon.putImageData(canvasRef.current, ctx, photonImage);

    createThumbs();
  }, [canvasRef]);

  return (<div className={main.container}>
    <div className={main.header}>
      <div>
        <NavLink className={main.textbutton} to="/">
          Cancel
        </NavLink>
      </div>
      <div onClick={() => {
          handleFilteredPhoto();
        }} className={[main.blue, main.bodyBold, main.textbutton].join(" ")}>
        Next
      </div>
    </div>
    <canvas className={main.photoplace} ref={canvasRef}></canvas>
    {
      thumbs.length >= 0
        ? (<div className={main.filterplace}>
          {
            thumbs.map(item => (<div className={main.filteritem}>
              <div>{item.filter}</div>
              <img src={item.src} width={100} height={100} onClick={() => changeEffect(item.filter)}></img>
            </div>))
          }
        </div>)
        : (<div>no thumbs yet</div>)
    }
  </div>);
}

export default FilterPhoto;