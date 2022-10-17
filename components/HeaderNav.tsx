import nav from "../styles/Nav.module.css"
import Link from "next/link"
import Image from "next/image"
import homeLogo from "../public/assets/image/portal.png"

const NavLayout = () => {
    return (
        <div className={nav.decoration}>
            <div className={nav.container}>
                <Link href="/">
                    <a className={nav.item}>
                        home
                    </a>
                </Link>
                <div className={nav.items}>
                    <Link href='/characters'>
                        <a className={nav.item}>characters</a>
                    </Link>
                    <Link href='/episodes'>
                        <a className={nav.item}>episodes</a>
                    </Link>
                    <Link href='/locations'>
                        <a className={nav.item}>locations</a>
                    </Link>
                </div>
                <Link href='/about'>
                    <a className={nav.item}>About</a>
                </Link>
            </div>




            {/* <nav className={style.nav}>
                <div className={style.logoHome}>
                    <Link href="/">
                        <a>
                          
                        </a>
                    </Link>
                    <p>Home</p>
                </div>
                <ul className={style.navBar}>
                    <li className={style.navBar__item}>
                        <Link href="/characters"><a>characters</a></Link>
                    </li>
                    <li className={style.navBar__item}>
                        <Link href="/episodes"><a>episodes</a></Link>
                    </li>
                    <li className={style.navBar__item}>
                        <Link href="/locations"><a>locations</a></Link>
                    </li>
                </ul>
                <ul className={style.navBar}>
                    <li className={style.navBar__item}>
                        <Link href="/about"><a>about</a></Link>
                    </li>
                </ul>
            </nav> */}
        </div>
    )
}
export default NavLayout