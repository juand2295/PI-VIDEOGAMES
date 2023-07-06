const { Router } = require('express');
const { getGenres, postGenre } = require('../handlers/genres');
const genresRouter = Router();
// const {xxxx} = require('../controllers/getVideogames')

genresRouter.get('/', getGenres);
genresRouter.post('/', postGenre)


module.exports = genresRouter;
