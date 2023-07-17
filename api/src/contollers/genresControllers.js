const  axios = require('axios')
const {Genres} = require('../db')
const URL = "https://api.rawg.io/api/"
const { API_KEY } = process.env;

const cleanArray = (arr) =>  arr.map(elem => {
    return {
        id: elem.id,
        name: elem.name,
    }
});

const getAllGenres = async() => {
    const dbbGenres = await Genres.findAll()
    if (!dbbGenres.length) {
        const apiGenresRaw = (await axios.get(URL + `genres?key=${API_KEY}`)).data.results
        const apiGenres = cleanArray(apiGenresRaw)
        await Genres.bulkCreate(apiGenres)
    }
    return dbbGenres
}

const createGenre = async(name) => {
    const genre = await Genres.create({name})
    return genre
}

module.exports={getAllGenres, createGenre}