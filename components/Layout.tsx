import HeaderNav from './HeaderNav';
import HeaderTitle from './HeaderTitle'
import style from "../styles/Home.module.css"
import Footer from './Footer';


const Layout = ({ children }) => {
    return (
      <>
        <HeaderTitle />
        <HeaderNav />
        <main>{children}</main>
        <Footer />
      </>
    )
  }

export default Layout