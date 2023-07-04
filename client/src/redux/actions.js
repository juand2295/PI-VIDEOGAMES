import axios from 'axios'
export const GET_VIDEOGAMES = 'GET_VIDEOGAMES'
export const GET_VIDEOGAMES_BY_NAME = 'GET_VIDEOGAMES_BY_NAME'
export const GET_VIDEOGAMES_BY_ID = 'GET_VIDEOGAMES_BY_ID'
export const FILTER_BY_SOURCE = 'FILTER_BY_SOURCE'
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE'
export const ORDER_ALPHABETICAL = 'ORDER_ALPHABETICAL'
export const ORDER_RATING = 'ORDER_RATING'


export const getVideogames = () => { //el action creator retorna una funcion que es la q se encarga de la op asincrona porque redux recordemos que no permite incertidumbre en su store, entonces la action no puede hacer directamente el llamado a la api.
    return  async function(dispatch){
        const backEndData = await axios.get('http://localhost:3001/videogames/')
        const videogames = backEndData.data
        dispatch({ type: GET_VIDEOGAMES, payload: videogames}) // el thunkMiddleware agarra esta funcion que retorna getVideogames y la ejecuta, cuando la ejecuta hace el dispatch y esa info va al reducer
    }
}

export const getVideogameByName = (name) => { //el action creator retorna una funcion que es la q se encarga de la op asincrona porque redux recordemos que no permite incertidumbre en su store, entonces la action no puede hacer directamente el llamado a la api.
    return  async function(dispatch){
        const backEndData = await axios.get(`http://localhost:3001/videogames?name=${name}`)
        const videogames = backEndData.data
        dispatch({ type: GET_VIDEOGAMES_BY_NAME, payload: videogames})
    }
}

export const getVideogameById = (id) => { //el action creator retorna una funcion que es la q se encarga de la op asincrona porque redux recordemos que no permite incertidumbre en su store, entonces la action no puede hacer directamente el llamado a la api.
    return  async function(dispatch){
        const backEndData = await axios.get(`http://localhost:3001/videogames/${id}`)
        const videogames = backEndData.data
        dispatch({ type: GET_VIDEOGAMES_BY_ID, payload: videogames})
    }
}

export const filterBySource = (source) => {
    return {type: FILTER_BY_SOURCE, payload: source}
}

export const filterByGenre = (genre) => {
    console.log(genre)
    return {type: FILTER_BY_GENRE, payload: genre}
}

export const orderAlphabetical = (order) => {
    return {
        type: ORDER_ALPHABETICAL,
        payload: order
    }
}

export const orderRating = (order) => {
    return {
        type: ORDER_RATING,
        payload: order
    }
}

