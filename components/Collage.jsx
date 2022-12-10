import { useState, useRef, useEffect } from 'react'
import { useUser } from '../context/Context'
import style from '../styles/Home.module.css'

function Collage({id, numeration, dataOrientations, remove}) {
    const { image, setAlbunImage} = useUser()

    const [arrA, setArrA] = useState([])
    const [opacity, setOpacity] = useState(false);
    const [reverse, setReverse] = useState(false);

    const dragItem = useRef();
    const dragOverItem = useRef();

    function handlerOnChange(e) {
        e.preventDefault()
        const fileName = e.target.name
        const file = e.target.files[0]
        setAlbunImage({ ...image, [fileName]: { file, url: URL.createObjectURL(file), rotate: 0 } })
    }
    function rotate (name) {
        image[name] && setImage({ ...image, [name]: { ...image[name],  rotate: image[name].rotate + 90 } })
        image[name] && setReverse(!reverse)
    }

    function handleDragStart(e, index) {
        console.log('start' + index)
        dragItem.current = index;
    }

    const handleDragEnter = (e, index) => {
        console.log('enter' + index)
        dragOverItem.current = index;
    };

    const handleDragEnd = (e, index) => {
        if (dragOverItem.current !== undefined )
       { console.log('end' + index)
        const copyListItems = [...arrA];
        [copyListItems[dragItem.current], copyListItems[dragOverItem.current]] = [copyListItems[dragOverItem.current], copyListItems[dragItem.current]]
        setArrA(copyListItems);
        dragItem.current = null;
        dragOverItem.current = null;}
    };
    useEffect(() => {
       setArrA([`A${id}`, `B${id}`, `C${id}`, `D${id}`, `E${id}`, `F${id}`, `G${id}`, `H${id}`, `I${id}`])
    }, [id, dataOrientations, numeration]);
    return (

        <div className={style.grid} >
            {arrA.map((i, index) => <div className={`${style.form} ${opacity ? style.opacity : ''}`} draggable onDragStart={(e) => handleDragStart(e, index)} onDragEnter={(e) => handleDragEnter(e, index)} onDragEnd={handleDragEnd} key={i}>
                {image[i] && <img src={image[i].url} className={`${style.image} ${reverse === true && style.reverse}`} style={{transform: `rotate(${dataOrientations[index] == 'h' ? '90': '0' }deg )`, objectFit: 'cover' , backgroundImage: `url(${image[i].url})`,   width: dataOrientations[index] == 'h' ? '303px' : '189px', height: dataOrientations[index] == 'h' ? '189px' : '303px'}} ></img>}
                {/* <button className={style.rotate} onClick={(e)=>rotate(i)}>↻</button> */}
                <span className={style.heart} style={{transform: `rotate(${dataOrientations[index] == 'h' ? '90': '0' }deg )`}}>{numeration[index]}</span>
                <label htmlFor={`Image-${i}`} className={style.labelFile} >Cargar Imagen {i}</label>
                <input className={style.inputFile} id={`Image-${i}`} type="file" name={i} onChange={handlerOnChange} accept='.jpg, .jpeg, .png' />

            </div>)}
            <button className={style.remove} onClick={(e)=>remove(id)}>Eliminar Seccion</button>
        </div>

    )
}

export default Collage
