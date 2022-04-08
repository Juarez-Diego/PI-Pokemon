import axios from "axios"

export function getPokemon(){
    return async function(dispatch){
        const getAllPokemon = await axios.get("http://localhost:3001/pokemons")
        return dispatch({
            type: "GET_POKEMON",
            payload: getAllPokemon.data
        })
    }
}

export function getTypes(){
    return async function(dispatch){
        const getallTypes = await axios.get("http://localhost:3001/types")
        return dispatch({
            type: "GET_TYPES",
            payload: getallTypes.data
        })
    }
}

export function getPokemonByName(name){
    return async function(dispatch){
        const getByName = await axios.get(`http://localhost:3001/pokemons?name=${name}`)
        return dispatch({
            type: "GET_BY_NAME",
            payload: getByName.data
        })
    }
}

export function getPokemonDetail(id){
    return async function(dispatch){
        const getDetail = await axios.get(`http://localhost:3001/pokemons/${id}`)
        return dispatch({
            type: "GET_DETAIL",
            payload: getDetail.data
        })
    }
}

export function createPokemon(payload){
    return async function(disptach){
        const create = await axios.post("http://localhost:3001/pokemons/", payload)
    }
}