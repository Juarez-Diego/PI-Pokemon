require('dotenv').config();
const { Router } = require('express');
const axios = require("axios");
const { Pokemon, Types } = require("../db");

const router = Router()



/////////////////////////////////////////// GET POKEMON FROM API USING NEXT /////////////////////////////////////////////////
const fetchAllPages = async function(url = "https://pokeapi.co/api/v2/pokemon") {
    
    const data = [];

    do {
        let response = await axios.get(url);
        url = response.data.next;
        data.push(...response.data.results);
    } while ( data.length < 40 );

   const result =  await Promise.all(
      data.map(async (id) => {
        let response = await axios.get(id.url)
        const todo = await response.data
        id = {...todo}
        return id
      }),
      
    )

    const all = result?.map(e => {
        return {
            id: e.id,
            name: e.name,
            types: e.types?.map(e => e.type.name),
            image: e.sprites.other.dream_world.front_default
        }
    })
    return all;
}


/////////////////////////////////////////// GET POKEMON FROM DATABASE /////////////////////////////////////////////////////////
const getDbInfo = async function(){
    const getAll = await Pokemon?.findAll({
        include: {
            model: Types,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    })

    const results = await getAll?.map(e => {
        return{
            id: e.id,
            name: e.name,
            types: e.Types?.map(v => v.name),
            image: e.image
        }
    })

    return results;
}


/////////////////////////////////////////// JOINING THE POKEMON INTO ONE ARRAY ////////////////////////////////////////////////
const allPokemon = async function(){
    const api = await fetchAllPages()
    const db = await getDbInfo()
    const all = api.concat(db)

    return all;
}



router.get("/", async (req, res) => {
    
    const {name} = req.query

    if (name) {
        const finalFunction = await allPokemon();
        let pokeName = await finalFunction?.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
        pokeName.length ? res.status(200).json(pokeName) : res.json("Pokemon not found");
    
      } else {
        const finalFunction = await allPokemon();
        res.status(200).json(finalFunction);
      }

})

module.exports = router;