
import { useState, useEffect } from 'react'
import { generateUUID } from '../utils/UIDgenerator'
import { writeUserData  } from '../firebase/utils'
import Button from '../components/Button'
import styles from '../styles/Uuid.module.css'
import Image from 'next/image'
import Layout from '../layout/Layout'
import { useUser } from '../context/Context.js'


export default function UuidController() {
  const { user, userDB, setUserSuccess, success } = useUser()

  const [uuid, setUuid] = useState([])

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
              <Button click={añadir} style={'buttonPrimary'}>añadir</Button>


            </div>

          </div>
        </main>

      </div>
      </Layout>

        )
}