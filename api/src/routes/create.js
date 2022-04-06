require('dotenv').config();
const { Router } = require('express');
const axios = require("axios");
const { Pokemon, Types } = require("../db");

const router = Router()


router.post("/", async (req, res) => {

    const {name, hp, attack, defense, speed, height, weight, image, types} = req.body

    const newPokemon = await Pokemon.create({
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        image,
        types,
    })

    const searchTypes = await Types.findAll({
        where: {
            name: types
        }
    })

    newPokemon.setTypes(searchTypes)

    res.status(200).send(newPokemon)
})


module.exports = router;