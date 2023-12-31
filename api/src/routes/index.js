const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const videogamesRouter = require('./videogames');
const genresRouter = require('./genres')

const mainRouter = Router();



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
mainRouter.use('/videogames', videogamesRouter)
mainRouter.use('/genres', genresRouter)

module.exports = mainRouter;
