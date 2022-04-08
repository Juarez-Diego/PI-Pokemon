import './App.css';
import React from "react";
import {Route, Switch} from "react-router-dom"

import LandingPage from './Components/LandingPage/LandingPage';
import Nav from './Components/Nav/Nav';
import Home from './Components/Home/Home';
import Form from './Components/Form/Form'
import PokemonDetail from './Components/PokemonDetail/PokemonDetail'


function App() {
  return (
    <div className="App">
      <Route path={['/home', '/pokemons/', '/pokemons/:PokeId',]}><Nav /></Route>
      <Switch>
      <Route exact path="/" render={() => <LandingPage />}></Route>
      <Route exact path="/home" render={() => <Home /> }></Route>
      <Route exact path="/pokemons" render={() => <Form />}></Route>
      <Route exact path="/pokemons/:PokeId" render={() => <PokemonDetail />}></Route>
      </Switch>
    </div>
  );
}

export default App;
