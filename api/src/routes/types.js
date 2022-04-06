require('dotenv').config();
const { Router } = require('express');
const axios = require("axios");
const { Pokemon, Types } = require("../db");

const router = Router()



const getTypes = async function(){
    let array = [];
    const apiUrl = await axios.get("https://pokeapi.co/api/v2/type")

    for(let i = 0; i < apiUrl.data.results.length; i++){
        array.push(apiUrl.data.results[i].name)
      }
    return array.sort();
}


router.get("/", async (req, res) => {

    const allTypes = await getTypes()

    allTypes.forEach(e => {
        Types.findOrCreate({
            where: {
                name: e
            }
        })
    })

    const types = await Types.findAll();

    res.json(types)
})


module.exports = router;