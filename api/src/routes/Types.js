require('dotenv').config();
const { Router } = require('express');
const { Pokemon, Types} = require('../db')
const axios = require('axios');

const router = Router()

const getTypes = async function(){
    const apiData = await axios.get("https://pokeapi.co/api/v2/type")

    const results = apiData.data.results.map(e => e.name).sort()

    results.forEach(e => {
        Types.findOrCreate({
            where: {
                name: e
            }
        })
    })

    const allTypes = await Types.findAll()

    return allTypes
}

router.get("/", async (req, res) => {

    const finalFunction = await getTypes()

    res.status(200).send(finalFunction)
})

module.exports = router;