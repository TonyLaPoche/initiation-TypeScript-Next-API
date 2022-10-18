import HeaderNav from './HeaderNav';
import HeaderTitle from './HeaderTitle'
import style from "../styles/Home.module.css"


const Layout = ({ children }) => {
    return (
      <>
        <HeaderTitle />
        <HeaderNav />
        <main>{children}</main>
      </>
    )
  }

export default Layout