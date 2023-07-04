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

    const videogame = useSelector(state=> state.videogames)
    console.log(videogame)
    console.log('holis')

    return (
        <div className={style.container}>
            <div>
            <img src={videogame.image} alt='imagen' />
            </div>
            <h4>id: {videogame.id}</h4>
            <h1>{videogame.name}</h1>
            <h4 className={style.h4date}>Released: {videogame.release_date}</h4>
            <h2>Platform/s</h2>
            <h3>{videogame.platforms}</h3>
            <h2>Genre/s</h2>
            <h3>{videogame.genres}</h3>
            <h2>Description:</h2>
            <h3>{videogame.description}</h3>
            <h1>{videogame.rating}</h1>
        </div>
    );
}
  
export default Detail;