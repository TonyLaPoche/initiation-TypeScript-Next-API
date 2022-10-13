import { GetCharacterResults } from "../../types";
import Image from "next/image";
import imageLoader from "../../imagesLoader";
import style from "../../styles/Home.module.css"
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

const Character = ({ info, results}: GetCharacterResults):JSX.Element => {
    const router = useRouter();
    const { id } = router.query;
    const nextPage = parseInt(typeof id === "string" ? id : id[0], 10) + 1;
    const prevPage = parseInt(typeof id === "string" ? id : id[0], 10) - 1;
    
    const handleClickNext = () => {
        console.log('click ok'); 
        router.push(`/characters/${nextPage}`)
    }

    const handleClickPrev = () => {
        console.log('click ok'); 
        router.push(`/characters/${prevPage}`)
    }

    // console.log(info);

    const handleKey = (e) => {
        if (e.key === "Enter") {
            router.push(`/characters/${e.currentTarget.value}`)
        }
    }

    return (
        <>
            <div className={style.main}>
                <h1>characters of Rick and Morty</h1>
                <p>
                    Page { id } on {info.pages}
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
                        defaultValue={ id }
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
                        <li>created : {character.created.slice(0, 10)} </li>
                        {
                            // NOTE demander à richard comment faire passez le type slice 
                        }
                    </ul>
                </div>   
                ))}
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;
    const res = await fetch(`https://rickandmortyapi.com/api/character/?page=${id}`)
    const data = await res.json()
    
    return {
        props: {
            ...data
        }
    }
}


export default Character