import { useState, useRef, useEffect } from 'react'
import QRCode from "react-qr-code";

import { useUser } from '../context/Context'
import Img from '../components/Img'
import style from '../styles/Collage.module.css'

function Collage({ id, remove }) {
    const { numeration, setAlbunNumeration, templates, qr, setQr, image, setAlbunImage, } = useUser()

    const dragItem = useRef();
    const dragOverItem = useRef();


    function handleDragStart(e, index) {
        //   console.log('start' + index)
        dragItem.current = index;
    }

    const handleDragEnter = (e, index) => {
        //  console.log('enter' + index)
        dragOverItem.current = index;
    };

    const handleDragEnd = (e, index) => {
        console.log(dragItem)
        console.log(dragOverItem)

        if (dragOverItem.current !== undefined) {
            console.log('end' + index)
            const copyListItems = [...numeration];
            [copyListItems[dragItem.current], copyListItems[dragOverItem.current]] = [copyListItems[dragOverItem.current], copyListItems[dragItem.current]]
            setAlbunNumeration(copyListItems);
            dragItem.current = null;
            dragOverItem.current = null;
        }
    };

    console.log(QRCode)

    const handlerQRUrl = (e) => {
        const qr = e.target.value
        setQr(qr)
    };

    function handlerOnChange(e) {
        e.preventDefault()
        const fileName = e.target.name
        const file = e.target.files[0]
        setAlbunImage({ ...image, [fileName]: { file, url: URL.createObjectURL(file), rotate: 0 } })
        console.log(e.target.value)
    }


    return (
        <div className={`${style.grid} ${id == 4 && style.flex}`} >
            {templates[id].map((i, index) =>

                <div className={`${style.form}`}
                    style={
                        id === 2 && index > 6

                            ? { height: '83mm', width: '63mm' }
                            : (
                                id == 4 && numeration.indexOf(numeration[index + (id * 9)]) !== 36
                                    ? { width: '80mm', height: '60mm' }
                                    : numeration.indexOf(numeration[index + (id * 9)]) == 36
                                        ? { height: '120mm', width: '160mm' }
                                        : { height: '80mm', width: '60mm' }
                            )}

                    draggable onDragStart={(e) => handleDragStart(e, index + (id * 9))}
                    onDragEnter={(e) => handleDragEnter(e, index + (id * 9))}
                    onDragEnd={handleDragEnd} key={index + (id * 9)}
                >

                    {/* <Img id={id} i={i} index={index} /> */}



                    {image[`Image-${numeration[index + (id * 9)]}`]
                        && <img src={image[`Image-${numeration[index + (id * 9)]}`].url} className={`${style.image}`}
                            style={{
                                transform: `rotate(${templates[id][index] == 'h' ? '90' : '0'}deg )`,
                                objectFit: 'cover',
                                width: templates[id][index] == 'h'
                                    ? (id === 2 && index > 6
                                        ? '80mm'
                                        : (numeration.indexOf(numeration[index + (id * 9)]) > 36
                                            ? '57mm' : '77mm'))
                                    : '100%',

                                height: templates[id][index] == 'h'
                                    ? (id === 2 && index > 6
                                        ? '60mm'
                                        : (numeration.indexOf(numeration[index + (id * 9)]) > 36
                                            ? '77mm'
                                            : '57mm'))
                                    : '100%'
                            }}

                            draggable onDragStart={(e) => handleDragStart(e, index + (id * 9))}
                            onDragEnter={(e) => handleDragEnter(e, index + (id * 9))}
                            onDragEnd={handleDragEnd} key={index + (id * 9)}
                        />}

                    <span className={style.heart} style={{ transform: `rotate(${templates[id][index] == 'h' ? '90' : '0'}deg )`, }}>{numeration.indexOf(numeration[index + (id * 9)]) + 1}</span>
                    <label htmlFor={`Image-${numeration[index + (id * 9)]}`} className={style.labelFile} >Cargar Imagen {numeration.indexOf(numeration[index + (id * 9)]) + 1}</label>
                    <input className={style.inputFile} id={`Image-${numeration[index + (id * 9)]}`} type="file" name={`Image-${numeration[index + (id * 9)]}`} onChange={handlerOnChange} accept='.jpg, .jpeg, .png' />
                </div>)


            }
            {
                id === 3 && <div style={{ height: "auto", margin: "0 auto", maxWidth: 120, width: "100%", }}>
                    <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={qr}
                        viewBox={`0 0 256 256`}
                    />
                    <input style={{ height: "auto", margin: "0 auto", maxWidth: 120, width: "100%", }} className={style.inputQR} onChange={handlerQRUrl} type="text" placeholder='Ingresar URL' />
                </div>
            }
        </div >
    )
}
export default Collage



// {image[i] && <img src={image[i].url} className={`${style.image} ${reverse === true && style.reverse}`} style={{transform: `rotate(${dataOrientations[index] == 'h' ? '90': '0' }deg )`, objectFit: 'cover' , backgroundImage: `url(${image[i].url})`,   width: dataOrientations[index] == 'h' ? '303px' : '189px', height: dataOrientations[index] == 'h' ? '189px' : '303px'}} ></img>}
// <span className={style.heart} style={{transform: `rotate(${dataOrientations[index] == 'h' ? '90': '0' }deg )`}}>{numeration[index]}</span>
// <label htmlFor={`Image-${i}`} className={style.labelFile} >Cargar Imagen {i}</label>
// <input className={style.inputFile} id={`Image-${i}`} type="file" name={i} onChange={handlerOnChange} accept='.jpg, .jpeg, .png' />

{/* <button className={style.rotate} onClick={(e)=>rotate(i)}>↻</button> */ }
