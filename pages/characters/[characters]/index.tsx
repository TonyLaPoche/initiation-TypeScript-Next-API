import { GetCharacterResults } from "../../../types";
import Image from "next/image";
import imageLoader from "../../../imagesLoader";
import style from "../../../styles/Home.module.css"
import { GetServerSideProps } from "next";
import { NextRouter, useRouter } from "next/router";
import React from "react";

const Characters = ({ info, results}: GetCharacterResults):JSX.Element => {
    const router: NextRouter = useRouter();
    const { characters } = router.query;
    const nextPage: Number = parseInt(typeof characters === "string" ? characters : characters[0], 10) + 1;
    const prevPage: Number = parseInt(typeof characters === "string" ? characters : characters[0], 10) - 1;
    
    const handleClickNext = () => {
        router.push(`/characters/${nextPage}`)
    }

    const handleClickPrev = () => {
        router.push(`/characters/${prevPage}`)
    }

    // console.log(info);

    const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            router.push(`/characters/${e.currentTarget.value}`)
        }
    }

    return (
        <>
            <div className={style.main}>
                <h1>characters of Rick and Morty</h1>
                <p>
                    Page { characters } on {info.pages}
                </p>
                <p>
                    {info.prev === null ? null
                    : 
                    <button type="button" onClick={handleClickPrev}>
                        previous
                    </button>
                    }
                    <input
                        type="number"
                        defaultValue={ characters }
                        onChange={(e) => console.log(e.target.value)}
                        onKeyDown={handleKey}
                        min="1"
                        max={info.pages}
                    />
                    {info.next === null ? null
                    : 
                    <button type="button" onClick={handleClickNext}>
                        next
                    </button>
                    }   
                </p>
            </div>
            
            <div className={style.container}>
                {results.map(character => (
                <div className={style.card} key={character.id}>

                    <Image
                        priority
                        src={character.image}
                        alt={character.name}
                        width={200}
                        height={200}
                        loader={imageLoader}
                    />

                    <ul>
                        <li>id : {character.id} </li>
                        <li>name : {character.name} </li>
                        <li>gender : {character.gender} </li>
                        <li>status : {character.status} </li>
                        <li>species : {character.species} </li>
                        <li>type : {character.type} </li>
                        <li>origin : {character.origin.name} </li>
                    </ul>
                </div>   
                ))}
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { characters } = context.query;
    const res = await fetch(`https://rickandmortyapi.com/api/character/?page=${characters}`)
    const data = await res.json()
    
    return {
        props: {
            ...data
        }
    }
}


export default Characters