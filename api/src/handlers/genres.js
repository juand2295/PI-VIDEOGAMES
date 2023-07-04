const { getAllGenres } = require("../contollers/genresControllers")


const getGenres = async (req, res) => {
    try {
        const genres = await getAllGenres()
        res.status(200).json(genres)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports= {getGenres}