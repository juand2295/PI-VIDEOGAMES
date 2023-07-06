import {FILTER_BY_GENRE, FILTER_BY_SOURCE, GET_VIDEOGAMES, GET_VIDEOGAMES_BY_ID, GET_VIDEOGAMES_BY_NAME, NEXT_PAGE, ORDER_ALPHABETICAL, ORDER_RATING} from './actions'

const initialState = {
    videogames: [],
    videogamesCopy: [],
    byId:[]
}
const reducer = (state = initialState, action) => {
    switch(action.type){
        case GET_VIDEOGAMES:
            return {...state, videogames: action.payload, videogamesCopy: action.payload}
        case GET_VIDEOGAMES_BY_NAME:
            return {...state, videogames: action.payload, videogamesCopy: action.payload}
        case GET_VIDEOGAMES_BY_ID:
            return {...state, byId: action.payload}
        case FILTER_BY_SOURCE:
            const filteredBySource = state.videogamesCopy.filter(vid => isNaN(vid.id) === isNaN(action.payload))
            return {...state, videogames: filteredBySource}
        case FILTER_BY_GENRE:
            const filteredByGenre = state.videogamesCopy.filter(vid => vid.genres? vid.genres.includes(action.payload) : 'No genre')
            return {...state, videogames: filteredByGenre}
        case ORDER_ALPHABETICAL:
            const newOrder = state.videogamesCopy.sort((a,b) => {
                if (action.payload === 'A'){
                    if (a.name < b.name){
                        return -1
                    }
                    if (a.name > b.name){
                        return 1
                    }
                }
                if (action.payload === 'D'){
                    if (a.name < b.name){
                        return 1
                    }
                    if (a.name > b.name){
                        return -1
                    }
                }
                return 0
            })
            return {
                ...state,
                videogames: newOrder
            }
        case ORDER_RATING:
            const newOrderRating = state.videogamesCopy.sort((a,b) => {
                if (action.payload === 'A'){
                    if (a.rating < b.rating){
                        return -1
                    }
                    if (a.rating > b.rating){
                        return 1
                    }
                }
                if (action.payload === 'D'){
                    if (a.rating < b.rating){
                        return 1
                    }
                    if (a.rating > b.rating){
                        return -1
                    }
                }
                return 0
            })
            return {
                ...state,
                videogames: newOrderRating
            }
        default:
            return {...state}
    }
}

export default reducer