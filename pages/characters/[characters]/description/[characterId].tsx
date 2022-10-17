import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router"
import imageLoader from "../../../../imagesLoader";
import { Character } from "../../../../types";


const Character = ({ ...data }: Character): JSX.Element => {
    const router = useRouter();
    const { characters, characterId }  = router.query
    console.log(router);
    
    return (
        <div>
            <h1>Review {characters} for product {characterId}</h1>
            <Image
                priority
                src={data.image}
                alt={data.name}
                width={200}
                height={200}
                loader={imageLoader}
            />
            <p>id : {data.id} </p>
            <p>name : {data.name} </p>
            <p>gender : {data.gender} </p>
            <p>status : {data.status} </p>
            <p>species : {data.species} </p>
            <p>type : {data.type} </p>
            <p>origin : {data.origin.name} </p>
            <p>List of episodes</p>
            <ul>
                {data.episode.map((episode) => {
                    return (
                        <li key={episode}>{episode}</li>
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