import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideogameById } from "../../redux/actions";
import style from './Detail.module.css'


const Detail = () => {
    const {id} = useParams()
    console.log(id)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getVideogameById(id))
    },[dispatch])

    const videogame = useSelector(state=> state.byId)
    console.log(videogame)
    console.log('holis')

    return (
        <div className={style.container}>
            <div>
            <img src={videogame.image} alt='imagen' />
            </div>
            <h4>id: {videogame.id}</h4>
            <h2>{videogame.name}</h2>
            <p>Released: {videogame.release_date}</p>
            <h3>Platform/s</h3>
            <p>{videogame.platforms}</p>
            <h3>Genre/s</h3>
            <p>{videogame.genres}</p>
            <h3>Description:</h3>
            <p>{videogame.description}</p>
            <h3>Rating:</h3>
            <p>{videogame.rating}</p>
        </div>
    );
}
  
export default Detail;