const { Router } = require('express');
const { getGenres } = require('../handlers/genres');
const genresRouter = Router();
// const {xxxx} = require('../controllers/getVideogames')

genresRouter.get('/', getGenres);
  


module.exports = genresRouter;
