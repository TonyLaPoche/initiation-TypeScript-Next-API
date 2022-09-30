import Link from "next/link"
import React from "react"
import styles from '../styles/Home.module.css'

function Layout({children}: { children: React.ReactNode}) {
    return <div>
        <nav className={styles.title}>
        <Link href="/">
        <a>
            Home
        </a>
      </Link>
        <a>
            Character
        </a>
        <a>
            Episode
        </a>
        </nav>
        {children}
    </div>
}

export default Layout