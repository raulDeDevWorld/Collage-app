import { handleSignOut } from '../firebase/utils'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Button from '../components/Button'
import style from '../styles/Layout.module.css'
import { useUser } from '../context/Context'

export default function Layout(props) {
    const router = useRouter()


    const { user, userDB, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG } = useUser()

    function logout() {
        handleSignOut()
    }
    function redirect(rute) {
        router.push(rute)
    }
    console.log(router.pathname)
    return (
        <>
            <header className={style.header}>
                <p>Bienvenido a OBZON</p>
                <div className={style.containerButtons}>
            {  userDB.users && userDB.users[user.uid] && userDB.users[user.uid].rol && userDB.users[user.uid].rol == 'Admin' &&
              <>
            {router.pathname == '/' || router.pathname && <Button style='buttonSecondary' click={()=>redirect('/')}>
                        Home
                    </Button>}
                    {router.pathname != '/Admin' && <Button style='buttonSecondary' click={()=>redirect('/Admin')}>
                        Admin
                    </Button>}
                    {router.pathname != '/UuidController' && <Button style='buttonSecondary' click={()=>redirect('/UuidController')}>
                        Generar IDU
                    </Button>}
                    </>  }
                    <Button style='buttonSecondary' click={logout}>
                        Cerrar Sesion
                    </Button>
                    <div className={style.power}>
                        <Image src="/power.svg" width="26" height="26" alt="power" onClick={logout} />
                    </div>
                </div>
            </header>
            <main className={style.main}>{props.children}</main>
        </>

    )
}
