const { getAllGenres, createGenre } = require("../contollers/genresControllers")


const getGenres = async (req, res) => {
    try {
        const genres = await getAllGenres()
        res.status(200).json(genres)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const postGenre = async (req, res) => {
    const {name} = req.body
    try {
        const genre = await createGenre(name)
        res.status(200).json(genre)
    } catch (error) {
        console.log(error)
        res.status(400).json({error:error.message})
    }

}

module.exports= {getGenres, postGenre}