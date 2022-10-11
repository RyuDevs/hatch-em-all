import React, {useState, useEffect, useMemo} from 'react';
import './App.css';
import Home from './container/home/home';
import Navigation from './container/navigation/navigation';
import Search from './components/search/search';
import Pokedex from './utils/pokedex';
import Loading from './components/loading/loading';
import Pokemon from './components/pokemon/pokemon';


function App() {
  const myPokedex = useMemo(() => new Pokedex(), []);
  const [pokemons, setPokemons] = useState(null);

  useEffect(() => {

    async function getPokemon() {
      const pokeData = await myPokedex.getPokemons();
      setPokemons(pokeData.results);
    }

    getPokemon();
  }, [myPokedex]);

  const getSpecies = async (name) => {
    const data = await myPokedex.getSpecies(name);
    return data;
  }

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
      <Search pokemons={pokemons} speciesInfo={getSpecies}></Search>
      <Pokemon></Pokemon>
    </div>
  );
}

export default App;
