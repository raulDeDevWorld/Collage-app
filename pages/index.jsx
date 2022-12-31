import { onAuth, signInWithEmail, handleSignOut, getCode } from '../firebase/utils'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '../context/Context'
import Particles from '../components/Particles'
import Collage from '../components/Collage'
import CollageQR from '../components/CollageQR'
import { WithAuth } from '../HOCs/WithAuth'
import Layout from '../layout/Layout'
import Error from '../components/Error'
import Figure from '../components/Figure'

import Success from '../components/Success'

import Modal from '../components/Modal'
import Button from '../components/Button'
import QRCode from "qrcode.react";

import style from '../styles/Home.module.css'

function Home() {
  const { user, userDB, setUserProfile, qr, setQr, setDataUrl, setUserSuccess, success, setUserData, pageOne, pageTwo, pageThree, handlerPageView, numeration } = useUser()
  const router = useRouter()

  const [mode, setMode] = useState(false)

  const [arr, setArr] = useState([1, 2, 3])
  const [pluss, setPluss] = useState(false)



  const [opacity, setOpacity] = useState(false);



  function nextClick(e) {
    e.preventDefault()
    if (!navigator.onLine) {
      setUserSuccess('NoInternet')
      return
    }
    const code = e.target.form[0].value
    console.log(code)
    getCode(code, user.uid, setUserSuccess)
  }

  function backClick(e) {
    e.preventDefault()
    router.p()
  }

  function arrItemsHandler() {
    if (arr.length > 2) {
      return
    }
    const copyListItems = [...arr]
    const arrPop = copyListItems.pop()
    setArr([...arr, arrPop == undefined ? 1 : arrPop + 1])
  }
  function handlerQR() {
    setQr(true)
  }
  function plussButton(key) {
    setPluss(!pluss)
  }

  function remove(id) {
    const newArr = arr.filter(i => i !== id)
    console.log(newArr)
    setArr(newArr)
  }

  function remove(data) {
    handlerPageView(data)
  }
  function removeQR() {
    setQr(!qr)
  }
  function handlerPDF() {
    router.push('/PdfViewer')
  }
  function x() {
    setMode(!mode)
  }


  
  const handlerQRUrl = (e) => {
    const qr = e.target.value
    setQr(qr)

};
  useEffect(() => {
    setDataUrl(document.getElementById('qr').toDataURL())
}, [qr]);

  return (
    <Layout >
      <div className={style.container}>

        <main className={style.main}>
          <button className={`${style.activator}`} onClick={x}> {userDB.users && userDB.users[user.uid] && userDB.users[user.uid].uid ? 'Eres Premium' : 'Activar cuenta'}</button>

          <div className={style.grid}>
            <Figure stylesProp={style.figureOne} url='#' index={numeration[0]} num={1} rotate={style.figureOneIMGRotate}></Figure>
            <Figure stylesProp={style.figureOne} url='#' index={numeration[1]} num={2} rotate={style.figureOneIMGRotate}></Figure>
            <Figure stylesProp={style.figureOne} url='#' index={numeration[2]} num={3} rotate={style.figureOneIMGRotate}></Figure>
            <Figure stylesProp={style.figureOne} url='#' index={numeration[3]} num={4} rotate={style.figureOneIMGRotate}></Figure>
            <Figure stylesProp={style.figureOne} url='#' index={numeration[4]} num={5} ></Figure>
            <Figure stylesProp={style.figureOne} url='#' index={numeration[5]} num={6} rotate={style.figureOneIMGRotate}></Figure>
            <Figure stylesProp={style.figureOne} url='#' index={numeration[6]} num={7} rotate={style.figureOneIMGRotate}></Figure>
            <Figure stylesProp={style.figureOne} url='#' index={numeration[7]} num={8} ></Figure>
            <Figure stylesProp={style.figureOne} url='#' index={numeration[8]} num={9} rotate={style.figureOneIMGRotate}></Figure>

            <div className={style.separator}></div>

            <Figure stylesProp={style.figureOne} url='#' index={numeration[9]} num={10} rotate={style.figureOneIMGRotate}></Figure>
            <Figure stylesProp={style.figureOne} url='#' index={numeration[10]} num={12} rotate={style.figureOneIMGRotate}></Figure>
            <Figure stylesProp={style.figureOne} url='#' index={numeration[11]} num={12} rotate={style.figureOneIMGRotate}></Figure>
            <Figure stylesProp={style.figureOne} url='#' index={numeration[12]} num={13} rotate={style.figureOneIMGRotate}></Figure>
            <Figure stylesProp={style.figureOne} url='#' index={numeration[13]} num={14} ></Figure>
            <Figure stylesProp={style.figureOne} url='#' index={numeration[14]} num={15} rotate={style.figureOneIMGRotate}></Figure>
            <Figure stylesProp={style.figureOne} url='#' index={numeration[15]} num={16} rotate={style.figureOneIMGRotate}></Figure>
            <Figure stylesProp={style.figureOne} url='#' index={numeration[16]} num={17} rotate={style.figureOneIMGRotate}></Figure>
            <Figure stylesProp={style.figureOne} url='#' index={numeration[17]} num={18} rotate={style.figureOneIMGRotate}></Figure>

            <div className={style.separator}></div>

            <Figure stylesProp={style.figureOne} url='#' index={numeration[18]} num={19} rotate={style.figureOneIMGRotate}></Figure>
            <Figure stylesProp={style.figureOne} url='#' index={numeration[19]} num={24} rotate={style.figureOneIMGRotate}></Figure>
            <Figure stylesProp={style.figureOne} url='#' index={numeration[20]} num={25} rotate={style.figureOneIMGRotate}></Figure>
            <Figure stylesProp={style.figureOne} url='#' index={numeration[21]} num={26} ></Figure>
            <Figure stylesProp={style.figureOne} url='#' index={numeration[22]} num={27} rotate={style.figureOneIMGRotate}></Figure>
            <Figure stylesProp={style.figureOne} url='#' index={numeration[23]} num={28} rotate={style.figureOneIMGRotate}></Figure>
            <Figure stylesProp={style.figureOne} url='#' index={numeration[24]} num={29} ></Figure>
            <Figure stylesProp={style.figureTwo} url='#' index={numeration[25]} num={30} rotate={style.figureTwoIMGRotate}></Figure>
            <Figure stylesProp={style.figureTwo} url='#' index={numeration[26]} num={31} rotate={style.figureTwoIMGRotate}></Figure>

            <div className={style.separator}></div>

            <Figure stylesProp={style.figureOne} url='#' index={numeration[27]} num={32} ></Figure>
            <Figure stylesProp={style.figureOne} url='#' index={numeration[28]} num={33} ></Figure>
            <Figure stylesProp={style.figureOne} url='#' index={numeration[29]} num={34} ></Figure>
            <Figure stylesProp={style.figureOne} url='#' index={numeration[30]} num={35} ></Figure>
            <Figure stylesProp={style.figureOne} url='#' index={numeration[31]} num={36} ></Figure>
            <Figure stylesProp={style.figureOne} url='#' index={numeration[32]} num={37} ></Figure>
            <Figure stylesProp={style.figureOne} url='#' index={numeration[33]} num={38} ></Figure>
            <div className={style.qr}>
                    <QRCode
                        id='qr'
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%", border: 'none'}}
                        value={qr}
                        level={'H'}
                        includeMargin={false}
                        renderAs={'canvas'}
                        viewBox={`0 0 256 256`}
                    />
                    <input style={{ height: "auto", margin: "0 auto", maxWidth: 120, width: "100%", }} className={style.inputQR} onChange={handlerQRUrl} type="text" placeholder='Ingresar URL' />
                </div>
            <div className={style.separator}></div>

            <Figure stylesProp={style.figureThree} url='#' index={numeration[34]} num={39} ></Figure>
            <Figure stylesProp={style.figureFour} url='#' index={numeration[35]} num={43} rotate={style.figureFourIMGRotate}></Figure>
            <Figure stylesProp={style.figureFour} url='#' index={numeration[36]} num={45} ></Figure>
          </div>








          <button className={`${style.pluss} ${style.plussFont}`} onClick={handlerPDF}>pdf</button>
        </main>
        {success == 'NonExist' && <Error>ERROR: codigo no existente</Error>}
        {success == 'InUse' && <Error>ERROR: codigo en uso</Error>}
        {success == 'Premium' && <Success>Felicidades, ERES PREMIUM !!</Success>}
        <Particles />
      </div>
      <Modal mode={mode} click={x} text={userDB.users && userDB.users[user.uid] && userDB.users[user.uid].uid ? 'Felicidades Eres Premium' : 'Ingresa tu codigo de activación'}>
        <form className={style.formActive}>

          {userDB.users && userDB.users[user.uid] && userDB.users[user.uid].uid
            ? <p className={style.codeActive}>   {userDB.users[user.uid].uid}     </p>


            : <input className={style.inputActive} type="text" placeholder='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx' />
          }
          <div className={style.buttonsContainer}>
            {userDB.users && userDB.users[user.uid] && userDB.users[user.uid].uid ? '' : <Button style='buttonPrimary' click={nextClick}>Continuar</Button>}
          </div>
        </form>
      </Modal>
    </Layout>
  )
}

export default WithAuth(Home)





{/* <Collage id={0} remove={() => remove('pageOne')} />
          <Collage id={1} remove={() => remove('pageTwo')} />
          <Collage id={2} remove={() => remove('pageThree')} />
          <Collage id={3} remove={() => remove('pageThree')} />
          <Collage id={4} remove={() => remove('pageFour')} /> */}









{/* {qr && <CollageQR id={'QR'} numeration={numeration[3]} dataOrientations={templates[`template4`]} remove={removeQR} />} */ }
{/* <button className={`${style.pluss} ${pluss === true ? style.add : ''}`} onClick={arrItemsHandler}>add</button>
          <button className={`${style.pluss} ${pluss === true ? style.qr : ''}`} onClick={handlerQR}>QR</button>
          <button className={`${style.pluss} ${pluss === true ? style.pdf : ''}`} onClick={handlerPDF}>pdf</button>
          <button className={`${style.pluss} ${style.plussFont}`} onClick={plussButton}>+</button> */}