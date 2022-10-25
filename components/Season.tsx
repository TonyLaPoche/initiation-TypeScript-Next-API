import { Episode } from "../types"
import list from "../styles/List.module.css"

const SeasonTab = ({...episode}: Episode) => {
    return (
        <>
            <li className={list.item}>
                <span>
                    {episode.episode} 
                </span>
                <span>
                    - {episode.name} -
                </span>
                <span>
                    {episode.air_date}
                </span>
            </li>
            <hr className={list.separator}/>
        </>
    )
}

export default SeasonTab