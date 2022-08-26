require('dotenv').config();
const { Router } = require('express');
const { Pokemon, Types} = require('../db')

const router = Router()


router.post("/", async (req, res) => {

    const {name, hp, attack, defense, speed, height, weight, image, type } = req.body
    
    const newPokemon = await Pokemon.create({
        name,
        hp,
        attack, 
        defense,
        speed,
        height,
        weight,
        image,
        type
    })

    const getTypes = await Types.findAll({
        where: {
            name: type
        }
    })

    newPokemon.setTypes(getTypes)

    res.status(200).json(newPokemon)
})

module.exports = router;