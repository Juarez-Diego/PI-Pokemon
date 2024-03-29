require('dotenv').config();
const { Router } = require('express');
const { Pokemon, Types} = require('../db')
const axios = require('axios');

const router = Router()

const getApi = async function(id){

    let temp = []
    const apiData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
   
    const results = [{
        id: apiData.data.id,
        name: apiData.data.name,
        hp: apiData.data.stats[0].base_stat,
        attack: apiData.data.stats[1].base_stat,
        defense: apiData.data.stats[2].base_stat,
        speed: apiData.data.stats[5].base_stat,
        height: apiData.data.height,
        wieght: apiData.data.weight,
        image: apiData.data.sprites.other.dream_world.front_default,
        types: apiData.data.types.map(e => e.type.name)

    }]

    return results
}

const getDb = async function(id){

  
    const getfromDb = await Pokemon.findOne({
        where: {
            id
        },
        include: {
            model: Types,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    })

    let temp = [];
    temp.push(getfromDb)

    const result =  temp?.map(e => {
        return {
            id: e.id,
            name: e.name,
            hp: e.hp,
            attack: e.attack,
            defense: e.defense,
            speed: e.speed,
            height: e.height,
            weight: e.weight,
            image: e.image,
            types: e.types?.map(v => v.name),
        }
    })

    return result;
}

router.get("/:id", async(req, res) => {

    const {id} = req.params

   try{

    if(id.includes("-")){
        const dbFinal = await(getDb(id))
        return res.json(dbFinal)
    }

    const apiFinal = await getApi(id)
    return res.json(apiFinal)

   } 
   catch(err){
    res.json("Pokemon not found!")
   }
 
})

module.exports = router;