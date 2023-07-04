const { createVideogame, getVideogameById, getAllGames, getGamesByName } = require("../contollers/videogameControllers");
const {getAllGenres} = require('../contollers/genresControllers')

// Nota: los handlers no deberian interactuar con el modelo, solo los controllers.
// De igual forma los controllers no deberian recibir datos directamente de la requeste ej: req.body sino hacer el destructuring en el handler y luego pasarselo al controller cada prop del body

const getAllVideogames = async (req, res) => {
    const {name} = req.query
    const results = name ? await getGamesByName(name) : await getAllGames()
    await getAllGenres()
    try {
        return res.status(200).json(results)
    } catch (error) {
        res.status(404).json({error: error.message})
     }
}

// Tengo que poder darme cuenta si es un id de la API o uno de los que cree UUID o que no exista
const getVideogamesById = async (req, res) => {
    const {id} = req.params
    const source = isNaN(id) ? 'BDD' : 'API';
    const videogame = await getVideogameById(id, source)
    try {
        return res.status(200).json(videogame)
    } catch (error) {
        res.status(400).json({error: error.message})
     }
}

const postVideogame = async (req, res) => {
    const { name, description, platforms, image, release_date, rating, genres} = req.body
    try {
        const newVideogame = await createVideogame(name, description, platforms, image, release_date, rating, genres)
        res.status(201).json(newVideogame)
        // return res.status(404).send('Not found')  
    } catch (error) {
        res.status(404).send(error.message)
     }
}




module.exports = {getAllVideogames, getVideogamesById, postVideogame}