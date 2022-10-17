import { GetStaticProps, GetStaticPropsContext, NextPage, PreviewData } from "next";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { GetCharacterResults } from "../types";
import type { NextPageWithLayout } from './_app';
import style from "../styles/Home.module.css";
import { ReactElement } from "react";
import Layout from "../components/Layout";


const Home:NextPageWithLayout<GetCharacterResults> = ({ ...retourAPI }: GetCharacterResults): JSX.Element => {

  return (
    <div className={style.main}>
      <p>Hi, I'm Tony.</p>
      <p>I'm currently training to manipulate the "TypeScript" language with "NextJs". To do this I used Axel Fuhrmann's API on the Rick & Morty universe.</p>
      <p>With this site you will be able to navigate in this API. Hopefully you won't encounter any bug. </p>
      <p>Find my project here.
      </p>
      <p>Welcome to the site.</p>
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