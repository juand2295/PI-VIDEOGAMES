const { Router } = require('express');
const videogamesRouter = Router();
const {getAllVideogames, getVideogamesById, postVideogame} = require('../handlers/videogames')


videogamesRouter.get('/', getAllVideogames)

videogamesRouter.get('/:id', getVideogamesById)

videogamesRouter.post('/', postVideogame)

module.exports = videogamesRouter;
