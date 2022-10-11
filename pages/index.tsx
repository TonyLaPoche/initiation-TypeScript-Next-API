import { GetStaticProps, GetStaticPropsContext, NextPage, PreviewData } from "next";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { GetCharacterResults } from "../types";


const Home:NextPage<GetCharacterResults> = ({ ...retourAPI }: GetCharacterResults): JSX.Element => {

const router: NextRouter = useRouter();
const stockResponseAPI = retourAPI
  const handleClick = () => {
    console.log('place order used !');
    router.push('/product');    
  }

  const handleClickAPI = () => {
    console.log(stockResponseAPI);  
  }

  return (
    <div>
      <h1>Home Page</h1>
      <Link href='/blog'>
        <a>blog</a>
      </Link>
      <Link href='/product'>
        <a>products list</a>
      </Link>

      <button onClick={handleClick}>Place Order</button>
      <button onClick={handleClickAPI}>Check API result</button>

    </div>
    
  )
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>) =>  {
    
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const retourApi = await res.json();

  return {
    props: {
      retourApi
    },
  };
}

export default Home;