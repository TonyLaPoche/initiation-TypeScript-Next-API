import { GetStaticProps, GetStaticPropsContext, NextPage, PreviewData } from "next";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { GetCharacterResults } from "../types";
import style from "../styles/Home.module.css"


const Home:NextPage<GetCharacterResults> = ({ ...retourAPI }: GetCharacterResults): JSX.Element => {

const stockResponseAPI = retourAPI

  const handleClickAPI = (): void => {
    console.log(stockResponseAPI);  
  }

  return (
    <div className={style.main}>
      <h1>API Rick &amp; Morty</h1>
      <nav>
        <ul>
          <li>
            <Link href="/characters"><a>characters list</a></Link>
          </li>
          <li>
            <Link href="/episodes"><a>episodes list</a></Link>
          </li>
          <li>
            <Link href="/locations"><a>locations list</a></Link>
          </li>
        </ul>
      </nav>
      <button onClick={handleClickAPI}>Check API result</button>
    </div>
    
  )
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>) =>  {
    
  const res = await fetch("https://rickandmortyapi.com/api");
  const retourApi = await res.json();

  return {
    props: {
      data: retourApi
    },
  };
}

export default Home;