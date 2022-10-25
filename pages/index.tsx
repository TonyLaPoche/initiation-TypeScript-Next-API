import { GetStaticProps, GetStaticPropsContext, NextPage, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import { GetCharacterResults } from "../types";
import style from "../styles/Home.module.css";


const Home:NextPage = (): JSX.Element => {

  return (
    <div className={style.main}>
      <p>Hi, I&apos;m Tony.</p>
      <p>I&apos;m currently training to manipulate the &ldquo;TypeScript&ldquo; language with &ldquo;NextJs&ldquo;. To do this I used Axel Fuhrmann&apos;s API on the Rick & Morty universe.</p>
      <p>
        With this site you will be able to navigate in this API.
      </p>
      <p>
        Hopefully you won&apos;t encounter any bug.
      </p>
      <p>Find my project here.
      </p>
      <p>Welcome to the site.</p>
    </div>
    
  )
}

export default Home;