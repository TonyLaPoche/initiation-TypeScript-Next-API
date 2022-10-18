import nav from "../styles/Nav.module.css"
import Link from "next/link"

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
                    <a className={nav.item}>about</a>
                </Link>
            </div>
        </div>
    )
}
export default NavLayout