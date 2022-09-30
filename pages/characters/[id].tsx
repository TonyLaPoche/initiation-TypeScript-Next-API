import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import imageLoader from '../../imagesLoader';
import { Character } from "../../types";
import styles from '../../styles/Home.module.css'

function CharacterPage({ character }:{character: Character}) {
    const router = useRouter()
    console.log('router => ',router);
    console.log('router.query =>',router.query);
    console.log(character);
    return <div className={styles.card}>
        <h2>Character page of {character.name} </h2>
        <Image
            loader={imageLoader}
            unoptimized
            src={character.image}
            alt={character.name}
            width="200"
            height="200"
        />
        <ul>
            <li>name: {character.name}</li>
            <li>gender: {character.gender}</li>
            <li>status: {character.status}</li>
            <li>species: {character.species}</li>
            <li>origin: {character.origin.name}</li>
        </ul>
    </div>
}

CharacterPage.getLayout = function getLayout(page: typeof CharacterPage){
    return <Layout>{page}</Layout>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const res = await fetch(
        `https://rickandmortyapi.com/api/character/${context.query.id}`
    );
    const character = await res.json()
    return {
        props: {
            character
        }
    }
}

export default CharacterPage;