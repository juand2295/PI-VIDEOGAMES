import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { filterByGenre, filterBySource, getVideogames, orderAlphabetical, orderRating } from "../../redux/actions";
import {useSelector} from 'react-redux'
import { useState } from "react";
import style from './Home.module.css'


const Home = () => {
    
    //// PGAINADO ////
    const ITEMS_PER_PAGE = 15
    const [currentPage, setCurrentPage] = useState(1)
    const [index, setIndex] = useState(0)
    const videogames = useSelector(state=> [...state.videogames].splice(index,15))// Me suscribo al estado global, hay q recordar que el estado global es un obj q solo puede ser modificado por el reducer(fn) a traves de las actions
    const totalVideogames = useSelector(state=> state.videogames.length)
    //////////////////

    const dispatch = useDispatch();
    
    useEffect(()=>{ // necesitamos que cuando se monte este componente o cuando se modifique el arr de dependencias se haga el dispatch de la action getVideogames para que el estado global se llene de videojuegos para esto necesitamos UseEffect y UseDispatch
        dispatch(getVideogames())
    }, [dispatch])

    const nextHandler = () => {
        if (currentPage === (Math.ceil(totalVideogames/ITEMS_PER_PAGE))) return
        setIndex(currentPage*ITEMS_PER_PAGE)
        const nextPage = currentPage + 1
        setCurrentPage(nextPage)
        console.log(index)
    }

    const lastHandler = () =>{
        setCurrentPage(Math.ceil(totalVideogames/ITEMS_PER_PAGE))
        setIndex(Math.ceil(totalVideogames/ITEMS_PER_PAGE-1)*ITEMS_PER_PAGE)
    }
    
    const firstHandler = () =>{
        setCurrentPage(1)
        setIndex(0)
    }

    const prevHandler = () => {
        if (currentPage === 1) return
        setIndex(((currentPage-1)*ITEMS_PER_PAGE)-15)
        const prevPage = currentPage - 1
        setCurrentPage(prevPage)
    }


    const handleSourceFilter = (event) => {
        setCurrentPage(1)
        setIndex(0)
        dispatch(filterBySource(event.target.value)) 
    }
    
    const handleGenreFilter = (event) => {
        setIndex(0)
        setCurrentPage(1)
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
            <button onClick={firstHandler}>First</button>
                <button onClick={prevHandler}>Prev</button>
                <h2 className={style.page}> {currentPage}</h2>
                <button onClick={nextHandler}>Next</button>
                <button onClick={lastHandler}>Last</button>
            </div>
        </>
    );
}
  
export default Home;