require('dotenv').config();
const { Router, response } = require('express');
const { Pokemon, Types} = require('../db')
const axios = require('axios');

const router = Router()


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
            attack: e.stats[1].base_stat,
            image: e.sprites.other.dream_world.front_default,
			types: e.types?.map(e => e.type.name),
        }
    })
    return all;
}


const getDb = async function(){

	const dbAll = await Pokemon?.findAll({
		include: {
			model: Types,
			attributes: ["name"],
			through: {
				attributes: []
			}
		}
	})


	const results = await dbAll?.map(e => {
		return{
			id: e.id,
			name: e.name,
			image: e.image,
			attack: e.attack,
			createdInDb: e.createdInDb,
			types: e.types?.map(v => v.name),
		}
	})

	return results
}

const allPokemon = async function(){
	const api = await fetchAllPages()
	const db = await getDb()
	const all = api.concat(db)

	return all
}


router.get("/", async (req, res) => {

	const {name} = req.query
	
	if(name){
		const finalFunction = await allPokemon()
		let pokeName = finalFunction.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
		pokeName.length ? res.status(200).json(pokeName) : res.json("Pokemon not found");
	} else {
		const finalFunction = await allPokemon();
		res.status(200).json(finalFunction)
	}
	
})



module.exports = router;