import { onAuth, signInWithEmail, handleSignOut } from '../firebase/utils'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '../context/Context'
import Particles from '../components/Particles'
import Collage from '../components/Collage'
import CollageQR from '../components/CollageQR'
import { WithAuth } from '../HOCs/WithAuth'
import Layout from '../layout/Layout'
import Error from '../components/Error'
import style from '../styles/Home.module.css'

function Home() {
  const { user, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG } = useUser()
  const router = useRouter()

  const [arr, setArr] = useState([1, 2, 3])
  const [numeration, setNumeration] =  useState([[1,2,3,4,5,6,7,8,9,], [10,11,12,13,14,15,16,17,18], [19,20,21,22,23,24,25,26,27], [28,29,30,31,32,33,34,35,36]])
  const [pluss, setPluss] = useState(false)
  const [qr, setQr] = useState(false)
  const [ templates, setTemplates ] = useState({
    template1: [
      'h', 'h', 'h',
      'h', 'v', 'h',
      'h', 'v', 'h'],
    template2: [
      'h', 'h', 'h',
      'h', 'v', 'h',
      'h', 'h', 'h'],
    template3: [
      'h', 'h', 'v',
      'v', 'h', 'h',
      'v', 'h', 'h'],
    template4: [
      'v', 'v', 'v',
      'v', 'v', 'v',
      'v', 'v', 'v'],

  })


  const [opacity, setOpacity] = useState(false);

  function arrItemsHandler() {
    if (arr.length > 2 ){
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

  function removeQR() {
    setQr(!qr)
  }


  return (


    <Layout>
      <div className={style.container}>

        <main className={style.main}>

          <button className={`${style.activator}`} onClick={arrItemsHandler}>Activar cuenta</button>


          {arr.map((i) => <Collage id={i} numeration={numeration[i-1]} dataOrientations={templates[`template${i}`]} remove={remove} />)}
          {qr && <CollageQR id={'QR'} numeration={numeration[3]} dataOrientations={templates[`template4`]} remove={removeQR} />}


          <button className={`${style.pluss} ${pluss === true ? style.add : ''}`} onClick={arrItemsHandler}>add</button>
          <button className={`${style.pluss} ${pluss === true ? style.qr : ''}`} onClick={handlerQR}>QR</button>
          <button className={`${style.pluss} ${pluss === true ? style.pdf : ''}`} onClick={arrItemsHandler}>pdf</button>
          <button className={`${style.pluss} ${style.plussFont}`} onClick={plussButton}>+</button>
        </main>
        {success == false && <Error>ERROR: verifique e intente nuevamente</Error>}
        {success == 'complete' && <Error>Llene todo el formulario</Error>}
        <Particles />
      </div>

    </Layout>

  )
}

export default WithAuth(Home) 
