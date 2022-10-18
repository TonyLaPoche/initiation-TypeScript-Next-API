import { GetCharacterResults } from "../../../types";
import Image from "next/image";
import imageLoader from "../../../imagesLoader";
import list from "../../../styles/List.module.css"
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

    const handleClickCharacter = (e) => {
        console.log(e.target.attributes.datatype.value);
        router.push(`/characters/description/${e.target.attributes.datatype.value}`)
    }

    const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            router.push(`/characters/${e.currentTarget.value}`)
        }
    }

    return (
        <>
            <div className={list.main}>
                <h1 className={list.title}>characters of Rick and Morty Series</h1>
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
            
            <div className={list.container}>
                {results.map(character => (
                <div className={list.card} key={character.id}>

                    <Image
                        priority
                        src={character.image}
                        alt={character.name}
                        width={200}
                        height={200}
                        loader={imageLoader}
                    />
                    <h2>{character.name}</h2>
                    <div className={list.button}>
                        <button type="button" datatype={character.id.toString()} onClick={handleClickCharacter}>
                             More Info 
                        </button>
                    </div>
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