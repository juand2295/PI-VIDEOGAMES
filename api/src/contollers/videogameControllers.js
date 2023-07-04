// Aca si debemos importar el modelo ya que el controller es el que va interactuar con el
// La instancia del modelo es la que esta en DB, lo que esta en la carpeta models es la funcion creadora, no el modelo de sequelize
const  axios = require('axios')
const {Videogame} = require('../db')
const URL = "https://api.rawg.io/api/"
const { API_KEY } = process.env;
const { Op } = require("sequelize");


const cleanArray = (arr) =>  arr.map(elem => {
    return {
        id: elem.id,
        name: elem.name,
        description: elem.description || elem.tags.map(e => e.name).join(', '),
        platforms: elem.parent_platforms? elem.parent_platforms.map(e => e.platform.name).join('| ') : 'No platform found',
        image: elem.background_image,
        release_date: elem.released,
        rating: elem.rating,
        genres: elem.genres.map(e=>e.name).join(' | ')
    }
});

const cleanResult = (elem) => {
    return {
        id: elem.id,
        name: elem.name,
        description: elem.description || elem.tags.map(e => e.name).join(', '),
        platforms: elem.parent_platforms? elem.parent_platforms.map(e => e.platform.name).join('| ') : 'No platform found',
        image: elem.background_image,
        release_date: elem.released,
        rating: elem.rating,
        genres: elem.genres.map(e=>e.name).join(' | ')
    }
};

const createVideogame = async(name, description, platforms, image, release_date, rating, genres) => {
    const newVideogame = await Videogame.create({name, description, platforms, image, release_date, rating, genres})
    await newVideogame.addGenres(genres)
    return newVideogame
}

const getVideogameById = async(id, source) => {
    const videogame = source === 'API' 
        ? cleanResult((await axios.get(URL + `games/${id}?key=${API_KEY}`)).data)
        : await Videogame.findByPk(id)
    return videogame
}  

const getAllGames = async() => {
    const dbbVideogames = await Videogame.findAll()
    const apiVideogamesRaw = (await axios.get(URL + `games?key=${API_KEY}&page_size=40`)).data.results
    const apiVideogames = cleanArray(apiVideogamesRaw)
    return [...dbbVideogames, ...apiVideogames] 
}

const getGamesByName = async(name) => {
    const dbbVideogames = await Videogame.findAll({
        where: {
            name: {[Op.like]: name} // no me esta funcionando bien el Op.like, cuando intento traer todo los GTA que esten en base de datos no trae nada, tengo que poner el nombre completo tal cual
        }
    })
    const apiVideogamesRaw = (await axios.get(URL + `games?key=${API_KEY}&search=${name}`)).data.results
    const apiVideogames = cleanArray(apiVideogamesRaw)
    const mergedResponse = [...dbbVideogames, ...apiVideogames]
    mergedResponse.splice(15)
    return mergedResponse
    
}

module.exports={createVideogame, getVideogameById, getAllGames, getGamesByName}