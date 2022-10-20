import foot from "../styles/Footer.module.css"
import Link from "next/link"

const Footer = () => {
    return (
        <>
        <hr />
            <footer className={foot.container}>
                <div className={foot.head}>
                    <p><em>Created by<span className={foot.item}>Tony Pocket.</span></em></p>
                </div>
                <div className={foot.main}>
                    <ul className={foot.list}>
                        <li className={foot.item}>About me</li>
                        <li className={foot.item}>About this API</li>
                        <li className={foot.item}>About this Project</li>
                    </ul>
                    <ul className={foot.list}>
                        <li className={foot.item}>Contact me</li>
                        <li className={foot.item}>Icon1 - Icon2</li>
                    </ul>
                </div>
            </footer>
        </>
    )
}
export default Footer