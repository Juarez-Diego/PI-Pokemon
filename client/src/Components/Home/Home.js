import React, {Fragment} from "react";
import {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Filters from "../Filters/Filters";
import SearchBar from "../SearchBar/SearchBar";
import Card from "../Card/Card"
import Loading from "../Loading/Loading";

import { getPokemon, getTypes } from "../../Actions";


function Home(){

const allPokemon = useSelector(state => state.pokemon)
const dispatch = useDispatch();

useEffect(() => {
    dispatch(getPokemon())
}, [])

useEffect(() => {                 // Intenta mover esto a App.js para que deje de cargar
    dispatch(getTypes())
}, [])

    return(
        <div>
            <h1>Componente Home</h1>
            <Filters />
            <SearchBar />

            {allPokemon?.map(e => {
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
};

export default Home;