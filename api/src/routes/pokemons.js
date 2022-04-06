require('dotenv').config();
const { Router } = require('express');
const axios = require("axios");
const { Pokemon, Types } = require("../db");

const router = Router()


/////////////////////////////////////////// GET POKEMON FROM API USING OFFSET /////////////////////////////////////////////////
const getApiInfo = async function(){
    let data = [];
    let num = 0;

    while(num !== 40){
        const apiUrl = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${num}&limit=20`)
        data = data.concat(apiUrl.data.results)

        num = num + 20
    }

    for(var i = 0; i < data.length; i++){
        const pokedata = await axios.get(data[i].url)
         data[i] = {...pokedata.data}
     }

     const results = data?.map(e => {
        return {
            id: e.id,
            name: e.name,
            types: e.types?.map(e => e.type.name),
            image: e.sprites.other.dream_world.front_default
        }
    })
    return results;

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
    const api = await getApiInfo()
    const db = await getDbInfo()
    const all = api.concat(db)

    return all;
}



router.get("/", async (req, res) => {
    
    const {name} = req.query
    const finalFunction = await allPokemon();

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