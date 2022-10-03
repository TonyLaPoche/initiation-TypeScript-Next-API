import { useState } from "react";
import { Character } from "../types";
import style from '../styles/Home.module.css';

const Home2 = () => {
    const [results, setResults] = useState<Character[]>();
    const callAPI = async(page: number) => {
        try {
            const results = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
            const data = await results.json();
            setResults(data.results);
        } catch(error) {
            console.log(error);
        }
    }

    // callAPI(1)

    return(
        <div>
            <button onClick={() => callAPI(1)}>API_CALL</button>
            <div className={style.card}>
                {results && results.map((character) => character.name)}
            </div>
        </div>
    )
}

export default Home2;