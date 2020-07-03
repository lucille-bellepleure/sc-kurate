import React, { useEffect, useState, useRef, useCallback } from "react"
import main from "styles.module.css"
import { Route, NavLink } from "react-router-dom";
import ProcessImage from 'react-imgpro';

export function FilterPhoto({ nextStage, setFilteredPhoto, image }) {
    let myCaman = null;
    const [thumbs, setThumbs] = useState([{ filter: "vintage", src: image }]);
    console.log(thumbs)

    const [img, setImg] = useState()
    const canvasRef = useRef(null)
    const thumbCanvasRef = useRef(null)
    const [currentFilter, setCurrentFilter] = useState("vintage")

    const filterMap = [
        { filter: "vintage" },
        { filter: "lomo" },
        { filter: "clarity" },
        { filter: "sinCity" },
        { filter: "sunrise" },
        { filter: "crossProcess" },
        { filter: "orangePeel" },
        { filter: "love" },
        { filter: "grungy" },
        { filter: "jarques" },
        { filter: "pinhole" },
        { filter: "oldBoot" },
        { filter: "glowingSun" },
        { filter: "hazyDays" },
        { filter: "herMajesty" },
        { filter: "nostalgia" },
        { filter: "hemingway" },
        { filter: "concentrate" }
    ];


    const handleFilteredPhoto = () => {
        var file = canvasRef.current.toDataURL('image/png', 1.0);
        //console.log(file);
        setFilteredPhoto(img);
        nextStage();
    }

    const changeEffect = (effect) => {
        window.Caman(
            canvasRef.current,
            img,
            function () {
                this.reset()
                this[effect]()
                this.render(function () {
                    setImg(this.toBase64())
                });
            }
        );
    }

    const createThumbs = () => {
        for (let index = 0; index < filterMap.length; index++) {
            const filter = filterMap[index];
            let thumb;
            var canvas = document.createElement('canvas');
            canvas.width = 100
            canvas.height = 100

            const thumbSrc = window.Caman(canvas, image, function () {
                this[filter.filter]()
                this.render(function () {
                    let base64 = this.toBase64()
                    setThumbs(thumbs => [...thumbs, { filter: filter.filter, src: base64 }])
                });
            })

        }
    }

    useEffect(() => {
        console.log(canvasRef.current)
        let ctx = canvasRef.current.getContext('2d')
        let img = new Image()
        img.src = image
        canvasRef.current.width = img.width
        canvasRef.current.height = img.height
        ctx.drawImage(img, 0, 0, img.width, img.height);

        myCaman = window.Caman(
            canvasRef.current,
            img,
            function () {
                this.render(function () {
                    setImg(this.toBase64())
                });
            });
        console.log(myCaman)


        createThumbs()

    }, [canvasRef]);

    return (
        <div className={main.container}>
            <div className={main.header}>
                <div><NavLink className={main.textbutton} to="/">Cancel</NavLink></div>
                <div onClick={() => { handleFilteredPhoto() }} className={[main.blue, main.bodyBold, main.textbutton].join(" ")}>Next</div>
            </div>
            <canvas className={main.photoplace} ref={canvasRef}></canvas>
            {thumbs.length >= 0 ?
                <div className={main.filterplace}>
                    {thumbs.map((item) => (
                        <div className={main.filteritem}
                        >
                            <div>{item.filter}</div>
                            <img
                                data-caman="vintage()"
                                src={item.src}
                                width={100}
                                height={100}
                                onClick={() => changeEffect(item.filter)}>
                            </img>
                        </div>

                    ))}


                </div>
                : <div>no thumbs yet</div>}


        </div>
    );
}

export default FilterPhoto;