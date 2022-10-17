import head from "../styles/Header.module.css"
import Link from "next/link"
import logoTitle from '../public/assets/image/Rick_et_Morty_Logo.png'
import Image from "next/image"

const TitleLayout = () => {
    return (
        <header className={head.main}>
            <Image
            src={logoTitle}
            alt='title'
            width={400}
            height={200}

            />
            <p>Public API from Axel Fuhrmann</p>
        </header>
    )
}
export default TitleLayout