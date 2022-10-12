import { GetCharacterResults } from "../../types";
import Image from "next/image";
import imageLoader from "../../imagesLoader";
import style from "../../styles/Home.module.css"

const Character = ({ info, results}: GetCharacterResults) => {

    const handleClick = () => {
        console.log('click ok'); 
    }

    return (
        <>
            <h1>characters of Rick and Morty</h1>
            <p>
                Page 1 
            </p>
            <p>
                <button type="button" onClick={handleClick}>
                    next
                </button>
            </p>
            {results.map(character => (
            <div className={style.card} key={character.id}>

                <Image
                    src={character.image}
                    alt={character.name}
                    width={200}
                    height={200}
                    loader={imageLoader}
                />

                <ul>
                    <li>name : {character.name} </li>
                    <li>gender : {character.gender} </li>
                    <li>status : {character.status} </li>
                    <li>species : {character.species} </li>
                    <li>type : {character.type} </li>
                </ul>
            </div>   
            ))}
        </>
    )
}

export default Character