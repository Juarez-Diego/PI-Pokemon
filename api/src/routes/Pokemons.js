require('dotenv').config();
const { Router } = require('express');
const { Pokemon, Types} = require('../db')
const axios = require('axios');

const router = Router()


const getAll = async function() {

	const apiData = await axios.get("https://pokeapi.co/api/v2/pokemon")
	const results = apiData.data.results

	return results
	
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
}


router.get("/", async (req, res) => {

	const finalFunction = await getAll();
	res.json(finalFunction)
})



module.exports = router;