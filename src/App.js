import React, {useState, useEffect} from 'react';
import './App.css';
import Home from './container/home/home';
import Navigation from './container/navigation/navigation';
import Search from './components/search/search';
import Pokedex from './utils/pokedex';
import Loading from './components/loading/loading';


function App() {

  const myPokedex = new Pokedex();
  const [pokemons, setPokemons] = useState(null);

  useEffect(() => {
    async function getPokemon() {
      const pokeData = await myPokedex.getPokemons();
      setPokemons(pokeData);
    }

    getPokemon();
  }, []);


  if(!pokemons){
    return (
    <div className='App'>
      <Navigation></Navigation>
      <Loading></Loading>
    </div>)
  }

  return (
    <div className="App">
      <Navigation></Navigation>
      <Home></Home>
      <Search pokemons={pokemons.results}></Search>
    </div>
  );
}

export default App;
