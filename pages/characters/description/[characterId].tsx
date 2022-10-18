import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router"
import imageLoader from "../../../imagesLoader";
import { Character } from "../../../types";
import character from "../../../styles/character.module.css"

const Character = ({ ...data }: Character): JSX.Element => {
    const router = useRouter();
    console.log(data);
    return (
        <div className={character.main}>
            <h1 className={character.title}>Decription about {data.name}</h1>
            <div className={character.container}>
            <div className={character.cadreImg}>
                <Image
                    priority
                    src={data.image}
                    alt={data.name}
                    width={200}
                    height={200}
                    loader={imageLoader}
                    className={character.img}
                />
            </div>
                <div className={character.description}>
                    <p>id in API : {data.id} </p>
                    <p>Name : {data.name} </p>
                    <p>Gender : {data.gender} </p>
                    <p>Status : {data.status} </p>
                    <p>Species : {data.species} </p>
                    <p>Type : {data.type} </p>
                    <p>Location : {data.location.name} </p>
                    <p>Origin : {data.origin.name} </p>
                    <p>Appeared in episodes {data.episode.length}</p>
                </div>
            </div>
            <h2 className={character.title}>List of episodes</h2>
            <ul className={character.array}>
                {data.episode.map((episode) => {
                    const number = episode.split('/')
                    return (
                        <li key={number[5]} className={character.array__item} >{number[5]}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { characterId } = context.query
    const res = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
    const data = await res.json()
    
    return {
        props: {
            ...data
        }
    }
}

export default Character