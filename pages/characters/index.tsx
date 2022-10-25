import { GetServerSideProps } from "next"
// import Image from "next/image";
import { useRouter } from "next/router";
import CarouselCharacters from "../../components/Caroussel";
// import imageLoader from "../../imagesLoader";
import style from "../../styles/Home.module.css"
import { GetCharacterResults } from "../../types";

const Characters = ({ info, results }: GetCharacterResults):JSX.Element => {

    const router = useRouter()    
    const handleClickNextPage = () =>  {
        console.log('click ok');
        router.push(router.route + '/1')
        
    }
    const Random:number = Math.floor(Math.random() * 42);
    console.log(Random);
    
    
    return (
        <>
            <div className={style.main}>
                <h1>characters of Rick and Morty</h1>
                <p>
                    Here we can found all characters about the Rick And Morty Series
                </p>
                <p>
                    You have {info.count} characters founded on {info.pages} pages.
                </p>
                <p>
                    To see characters per pages click on the button &quot;show me&quot; below
                </p>
                <p>
                    <button type="button" onClick={handleClickNextPage}>
                        Show me
                    </button>
                </p>
            </div>
            
            <CarouselCharacters results={results} info={info} />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const Random:number = Math.floor(Math.random() * 42);
    const res = await fetch(`https://rickandmortyapi.com/api/character/?page=${Random}`)
    const data = await res.json()
    
    return {
        props: {
            ...data
        }
    }
}

export default Characters