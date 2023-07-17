import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { getVideogameByName, getVideogames } from "../../redux/actions"
import SearchBar from "../../components/SearchBar/SearchBar";
import style from './NavBar.module.css'
import { useLocation } from "react-router-dom";

const NavBar = () => {

    const location = useLocation().pathname

    const dispatch = useDispatch();

    const [searchString, setSearchstring] = useState('')
   
    const handleChange =(event) => {
        event.preventDefault()
        setSearchstring(event.target.value)
        dispatch(getVideogameByName(event.target.value))
    }

    const handleSubmit = () => { // Not being used, if I want to put a search button I could put the dispatch getVideogameByName here
        dispatch(getVideogameByName(searchString))
    }

    const handleReset = () => {
        dispatch(getVideogames())
        setSearchstring('')
    }

    const homeClickHandler = () => {
        dispatch(getVideogames())
        setSearchstring('')
    }

    return (
        <div className={style.mainContainer}>
            <Link onClick={homeClickHandler} className={style.home} to='/home'>Home</Link>
            <Link className={style.forms} to='/create'>Form</Link>
            {location !== '/create' && <SearchBar handleChange={handleChange} handleSubmit={handleSubmit} searchString={searchString} handleReset={handleReset}/>}
        </div>
    );
}
  
export default NavBar;