import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { filterByGenre, filterBySource, getVideogameByName, getVideogames, orderAlphabetical, orderRating } from "../../redux/actions";
import SearchBar from "../../components/SearchBar/SearchBar";
import {useSelector} from 'react-redux'
import { useState } from "react";
import style from './Home.module.css'

const Home = () => {
    
    //// PGAINADO ////
    const ITEMS_PER_PAGE = 5
    const [currentPage, setCurrentPage] = useState(1)
    const [index, setIndex] = useState(0)
    const videogames = useSelector(state=> [...state.videogames].splice(index,5))// Me suscribo al estado global, hay q recordar que el estado global es un obj q solo puede ser modificado por el reducer(fn) a traves de las actions
    //////////////////

    const dispatch = useDispatch();
    
    useEffect(()=>{ // necesitamos que cuando se monte este componente o cuando se modifique el arr de dependencias se haga el dispatch de la action getVideogames para que el estado global se llene de videojuegos para esto necesitamos UseEffect y UseDispatch
        dispatch(getVideogames())
    }, [dispatch])

    

    const nextHandler = () => {
        setIndex(currentPage*ITEMS_PER_PAGE)
        const nextPage = currentPage + 1
        setCurrentPage(nextPage)
        console.log(index)
    }
    

    const prevHandler = () => {
        setIndex(((currentPage-1)*ITEMS_PER_PAGE)-5)
        const prevPage = currentPage - 1
        setCurrentPage(prevPage)
    }
    

    const [searchString, setSearchstring] = useState('')
   
    const handleChange =(event) => {
        event.preventDefault()
        setSearchstring(event.target.value)
    }

    const handleSubmit = () => {
        dispatch(getVideogameByName(searchString))
    }


    // // const [displayItems, SetDisplayItems] = useState([...videogames].splice(0, 5))
    

    const handleSourceFilter = (event) => {
    dispatch(filterBySource(event.target.value)) 
    }
    
    const handleGenreFilter = (event) => {
    dispatch(filterByGenre(event.target.value)) 
    }

    const handleAlphabeticalOrder = (event) => {
        dispatch(orderAlphabetical(event.target.value))
        setAux(!aux)
    }

    const handleRatingOrder = (event) => {
        dispatch(orderRating(event.target.value))
        setAux(!aux)
    }

    const[aux, setAux] = useState(false)

    return (
        <>  
            <div>
                <SearchBar handleChange={handleChange} handleSubmit={handleSubmit} searchString={searchString}/>
            </div>
            <select name="source" defaultValue={'DEFAULT'} onChange={handleSourceFilter}>
                <option value="DEFAULT" disabled>-Filter Source-</option>
                <option value="a1">BDD</option>
                <option value="1">API</option>
            </select>
            <select name="genres" defaultValue={'DEFAULT'} onChange={handleGenreFilter}>
                <option value="DEFAULT" disabled>-Filter Genre-</option>
                <option value="RPG">RPG</option>
                <option value="Action">Action</option>
                <option value="Adventure">Adventure</option>
                <option value="Shooter">Shooter</option>
            </select>
            <select name="alphabeticalOrder" defaultValue={'DEFAULT'} onChange={handleAlphabeticalOrder}>
                <option value="DEFAULT" disabled>-Order Alphabetically-</option>
                <option value="A">A to Z</option>
                <option value="D">Z to A</option>
            </select>
            <select name="ratingOrder" defaultValue={'DEFAULT'} onChange={handleRatingOrder}>
                <option value="DEFAULT" disabled>-Order by Rating-</option>
                <option value="A">Worst to Best</option>
                <option value="D">Best to Worst</option>
            </select>
            <CardsContainer videogames={videogames}/>
            <div className={style.pageButtons}>
                <button onClick={prevHandler}>Prev</button>
                <button onClick={nextHandler}>Next</button>
                {/* <h2 className={style.page}> {index}</h2> */}
            </div>
        </>
    );
}
  
export default Home;