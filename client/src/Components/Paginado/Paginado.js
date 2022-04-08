import React, {Fragment} from "react";

import {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Card from "../Card/Card";

function Paginado(){

const dispatch = useDispatch()
const allPokemon = useSelector(state => state.pokemon)

const [currentPage, setCurrentPage] = useState(1)
const [pokemonPerPage, setPokemonPerPage] = useState(12)


const indexOfLastPokemon = currentPage * pokemonPerPage;
const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage; 
const currentPokemon = allPokemon.slice(indexOfFirstPokemon, indexOfLastPokemon)

const pages = function(pageNumber) {
	setCurrentPage(pageNumber)
}

const pageNumber = [];

    for(var i = 1; i <= Math.ceil(allPokemon.length / pokemonPerPage); i++){
        pageNumber.push(i)
    }

    return(
        <div>
            <h1>Paginado Verga</h1>

            <nav>
            <ul>
                {pageNumber && pageNumber.map(number => {return(
                    <li key={number}>
                        <a onClick={() => pages(number)}>{number}</a>
                    </li>
                )})}
            </ul>
            </nav>
            

            {currentPokemon?.map(e => {
            return (
            <div>
            <Fragment>
                <Link to={`/pokemons/${e.id}`} style={{ textDecoration: 'none' }} > 
                    <Card 
                    key={e.id} 
                    name={e.name}
                    types={e.types.map(v => v).join(", ")}
                    image={e.image}
                    id={e.id}
                    />
                </Link>
            </Fragment>
            
            </div>
            )}
        )}

        </div>
    )
}

export default Paginado;
