require('dotenv').config();
const {Router} = require("express")
const axios = require("axios");
const { Pokemon, Types } = require("../db");

const router = Router()


/////////////////////////////////////////// GET POKEMON FROM API /////////////////////////////////////////////////
const apiDetail = async function(id){

    let temp = [];
    const apiUrl = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    temp.push(apiUrl.data)

    const results = temp?.map(e => {
        return {
            id: e.id,
            name: e.name,
            types: e.types?.map(e => e.type.name),
            hp: e.stats[0].base_stat,
            attack: e.stats[1].base_stat,
            defense: e.stats[2].base_stat,
            speed: e.stats[5].base_stat,
            height: e.height,
            weight: e.weight,
            image: e.sprites.other.dream_world.front_default
        }
    })
    return results;

}


/////////////////////////////////////////// GET POKEMON FROM DATABASE /////////////////////////////////////////////////
const dbDetail = async function(id){

    const poke = await Pokemon.findOne({
        where: {
            id,
        },
        include: {
            model: Types, 
            attributes: ['name'],
            through: {
                attributes:[]
            }
        }
    })

    let temp = [];
    temp.push(poke)

    const result =  temp?.map(e => {
        return {
            id: e.id,
            name: e.name,
            types: e.Types?.map(v => v.name),
            hp: e.hp,
            attack: e.attack,
            defense: e.defense,
            speed: e.speed,
            height: e.height,
            weight: e.weight,
            image: e.image
        }
    })

    return result;

}




router.get("/:PokeId", async (req, res) => {
    
    const { PokeId } = req.params;

    try {
        if (PokeId.includes("-")) { 
            const database = await dbDetail(PokeId)
            return res.json(database);
        }

        const api = await apiDetail(PokeId)
        res.json(api );

      } catch (err) {
        res.json("Pokemon ID not found");
      }
});



module.exports = router;

