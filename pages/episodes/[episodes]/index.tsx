import { GetServerSideProps } from "next";
import { NextRouter, useRouter } from "next/router";
import list from "../../../styles/List.module.css"
import { Episode } from "../../../types";

const Episodes = ({ info, results}) => {
    const router: NextRouter = useRouter();
    const { episodes } = router.query;
    const nextPage: Number = parseInt(typeof episodes === "string" ? episodes : episodes[0], 10) + 1;
    const prevPage: Number = parseInt(typeof episodes === "string" ? episodes : episodes[0], 10) - 1;

    const handleClickNext = () => {
        router.push(`/episodes/${nextPage}`)
    }

    const handleClickPrev = () => {
        router.push(`/episodes/${prevPage}`)
    }

    const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            router.push(`/episodes/${e.currentTarget.value}`)
        }
    }

    // console.log(episodes);
    // console.log(info);
    console.log(results);
    
    
    return (
        <>
            <div className={list.main}>
                <h1 className={list.title}>characters of Rick and Morty Series</h1>
                <p>
                    Page { episodes } on {info.pages}
                </p>
                <p>
                    {episodes === "1" ? null
                    : 
                    <button type="button" onClick={handleClickPrev}>
                        previous
                    </button>
                    }
                    <input
                        type="number"
                        defaultValue={ episodes }
                        onChange={(e) => console.log(e.target.value)}
                        onKeyDown={handleKey}
                        min="1"
                        max={info.pages}
                    />
                    {episodes === "3" ? null
                    : 
                    <button type="button" onClick={handleClickNext}>
                        next
                    </button>
                    }   
                </p>
            </div>
            <ul>
                {results.map((episode: Episode) => {
                    return (
                        <li key={episode.name + episode.id}>
                            {episode.episode} - {episode.name} - {episode.air_date}
                        </li>
                    )
                })}
            </ul>

        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { episodes } = context.query;
    const res = await fetch(`https://rickandmortyapi.com/api/episode/?page=${episodes})`)
    const data = await res.json()
    
    return {
        props: {
            ...data
        }
    }
}


export default Episodes;