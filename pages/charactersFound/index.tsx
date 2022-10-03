import { GetServerSideProps } from "next";
import { Character, GetCharacterResults, Info } from "../../types"

const charactersFound:<{ charactersFound: Character[], info: Info }> = ({charactersFound, info}) => {
    return (
        <>
            <div> {charactersFound} </div>
            <div> {info} </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) =>{  
  
    const res = await fetch(`https://rickandmortyapi.com/api/character/?page=${context}`);
    // const res = await fetch(" // ! https://rickandmortyapi.com/api/character");
    // NOTE J'essaie de rendre l'URL dynamique à un état du State mais je comprend pas encore très bien l'usage de // ? "context"
    const { results, info }: GetCharacterResults = await res.json();
    
    return {
      props:{
        characters: results,
        info: info,
      },
    };
  };