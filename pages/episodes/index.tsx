import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import style from "../../styles/Home.module.css"
import { GetEpisodeResult } from "../../types";

const Episodes = ({ info, results }: GetEpisodeResult):JSX.Element => {
    console.log(info);
    console.log(results);
    const router = useRouter()    
    const handleClickNextPage = () =>  {
        console.log('click ok');
        router.push(router.route + '/1')
        
    }
    return (
        <>
            <div className={style.main}>
                <h1>characters of Rick and Morty</h1>
                <p>
                    Here we can found all characters about the Rick And Morty Series
                </p>
                <p>
                    You have {info.count} episodes founded on {info.pages} pages.
                </p>
                <p>
                    To see each episodes per Pages click on the button &quot;show me&quot; below
                </p>
                <p>
                    <button type="button" onClick={handleClickNextPage}>
                        Show me
                    </button>
                </p>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const res = await fetch("https://rickandmortyapi.com/api/episode")
    const data = await res.json()

    return {
        props: {
            ...data
        }
    }
}



export default Episodes;