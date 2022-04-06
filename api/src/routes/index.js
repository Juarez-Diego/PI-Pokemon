const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const allPokemonsRoute = require("./pokemons2")
const pokemonById = require("./pokemonId")
const allTypes = require("./types")
const createPokemon = require("./create")



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/pokemons", allPokemonsRoute);
router.use("/types", allTypes);
router.use("/pokemons", createPokemon)
router.use("/pokemons", pokemonById)


module.exports = router;
