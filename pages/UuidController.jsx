
import { useState, useEffect } from 'react'
import { generateUUID } from '../utils/UIDgenerator'
import { writeUserData  } from '../firebase/utils'
import Button from '../components/Button'
import styles from '../styles/Uuid.module.css'
import Image from 'next/image'
import Layout from '../layout/Layout'
import { useUser } from '../context/Context.js'

import { useRouter } from 'next/router'

export default function UuidController() {
  const { user, userDB, setUserSuccess, success, uuid, setUuid} = useUser()
  const router = useRouter()


  function generate() {
    let uuidGenerates = []
    for (let i = 0; i < 20; i++) {
      const newUuid = generateUUID()
      uuidGenerates.push(newUuid)
    }
    setUuid([...uuidGenerates])
  }

  function añadir() {
    const obj = uuid.reduce(function (target, key, index) {
      target[key] = false
      return target;
    }, {})
    return writeUserData('/activadores', obj, setUserSuccess )
  }


  function redirect () {
    router.push('/PDFdoc')
  }
  useEffect(() => {

  }, []);







  return (
    <Layout>

      <div className={styles.container}>
        <main className={styles.main}>
          {/* <img src="/logoCircle.png" className={styles.logo} alt="User" /> */}
          <div className={styles.container}>
            <div className={styles.buttons}>
              <Button click={generate} style={'buttonPrimary'}>generate</Button>
              <br /> <br />
              <div className={styles.box}>
                {uuid.map((i, index) => <div key={index}>{i} <br /> <br /></div>)}
              </div>
              <br />
              <Button click={añadir} style={'buttonPrimary'}>añadir</Button> <br />
              <br />

              <Button click={redirect} style={'buttonPrimary'}>Descargar PDF</Button>
              <br />
              <br />

            </div>

          </div>
        </main>

      </div>
      </Layout>

        )
}