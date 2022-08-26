const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const allPokemon = require('./Pokemons');
const pokemonId = require('./PokemonById');
const createPokemon = require('./CreatePokemon');
const types = require('./Types');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/pokemon", allPokemon);
router.use("/pokemon/", pokemonId);
router.use("/pokemon", createPokemon)
router.use("/types", types)


module.exports = router;
