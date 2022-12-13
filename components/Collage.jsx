import { useState, useRef, useEffect } from 'react'
import QRCode from "react-qr-code";

import { useUser } from '../context/Context'
import Img from '../components/Img'
import style from '../styles/Home.module.css'

function Collage({ id, remove }) {
    const { numeration, setAlbunNumeration, templates, qr, setQr } = useUser()

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


    return (
        <div className={`${style.grid} ${id == 4 && style.flex}`} >
            {templates[id].map((i, index) =>

                <div className={`${style.form}`} style={id === 2 && index > 6 ? { height: '83mm', width: '63mm' } : (id == 4 ? { width: '80mm', height: '60mm'}:  { height: '80mm', width: '60mm' })} draggable onDragStart={(e) => handleDragStart(e, index + (id * 9))} onDragEnter={(e) => handleDragEnter(e, index + (id * 9))} onDragEnd={handleDragEnd} key={index + (id * 9)}>
                   
                     <Img id={id} i={i} index={index} />
                    

                </div>)}
            {id === 3 && <div style={{ height: "auto", margin: "0 auto", maxWidth: 120, width: "100%", }}>
                <QRCode
                    size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={qr}
                    viewBox={`0 0 256 256`}
                />
                <input style={{ height: "auto", margin: "0 auto", maxWidth: 120, width: "100%", }} className={style.inputQR} onChange={handlerQRUrl} type="text" placeholder='Ingresar URL' />
            </div>
            }
        </div>
    )
}
export default Collage



// {image[i] && <img src={image[i].url} className={`${style.image} ${reverse === true && style.reverse}`} style={{transform: `rotate(${dataOrientations[index] == 'h' ? '90': '0' }deg )`, objectFit: 'cover' , backgroundImage: `url(${image[i].url})`,   width: dataOrientations[index] == 'h' ? '303px' : '189px', height: dataOrientations[index] == 'h' ? '189px' : '303px'}} ></img>}
// <span className={style.heart} style={{transform: `rotate(${dataOrientations[index] == 'h' ? '90': '0' }deg )`}}>{numeration[index]}</span>
// <label htmlFor={`Image-${i}`} className={style.labelFile} >Cargar Imagen {i}</label>
// <input className={style.inputFile} id={`Image-${i}`} type="file" name={i} onChange={handlerOnChange} accept='.jpg, .jpeg, .png' />

{/* <button className={style.rotate} onClick={(e)=>rotate(i)}>↻</button> */ }
