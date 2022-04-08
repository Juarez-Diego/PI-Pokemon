import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonDetail } from "../../Actions";

import Loading from "../Loading/Loading";
import "../../Images/Pokedex.jpg"

function PokemonDetail(){

const def = "https://gcdn.lanetaneta.com/wp-content/uploads/2022/01/Pokemon-necesita-una-Pokedex-100-nueva-Adios-Pikachu.jpg"
const dispatch = useDispatch();
const detailedPokemon = useSelector(state => state.pokemonDetail);

const {PokeId} = useParams();


useEffect(() => {
    dispatch(getPokemonDetail(PokeId))
}, [dispatch, PokeId])

    return(
        <div>
            {!Array.isArray(detailedPokemon) ? (<div className="name-not-found"><h1>Videogame not found, please try another search</h1></div>) :

            detailedPokemon.length > 0 ? 

        <div>

        <div>
        <img src={detailedPokemon[0].image} onError={(e)=>{e.target.onerror = null; e.target.src=def}} alt="img" width="600px" height="300px" ></img>

        <div>
        <div>
        <h1>{detailedPokemon[0].name}</h1>
        </div>

        <div>
        <h2>Types: {detailedPokemon[0].types.join(", ")}</h2>
        </div>

        <div>
        <h3>Pokemon No.: {detailedPokemon[0].id}</h3>
        </div>
        </div>
        </div>

        <div>
        <h2>HP: {detailedPokemon[0].hp}</h2>
        </div>

        <div>
        <h3>Attack: {detailedPokemon[0].attack}</h3>
        </div>

        <div>
        <h3>Defense: {detailedPokemon[0].defense}</h3>
        </div>

        <div>
        <h3>Height: {detailedPokemon[0].height}</h3>
        </div>

        <div>
        <h3>Weight: {detailedPokemon[0].weight}</h3>
        </div>
            
    </div> :  (<Loading />) 
  }
        </div>
    )
}

export default PokemonDetail;