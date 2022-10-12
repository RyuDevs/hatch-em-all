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

  const [pokemonCache, setPokemonCache] = useState(null);
  const [speciesCache, setSpeciesCache] = useState([]);
  const [speciesToAdd, setSpeciesToAdd] = useState(0);
  const [language, setLanguage] = useState('de');

  useEffect(() => {

    async function getPokemon() {
      const pokeData = await myPokedex.getPokemons();
      setPokemonCache(pokeData.results);
    }

    getPokemon();
  }, [myPokedex]);

  useEffect(() => {
    async function getSpecies() {
      const result = await myPokedex.getSpecies(speciesToAdd);
      setSpeciesCache(prev => [...prev, result]);
    }
    if (speciesToAdd !== 0){
      getSpecies();
    }
  }, [speciesToAdd, myPokedex])

  if(!pokemonCache){
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
      <Search pokemonCache={pokemonCache} speciesCache={speciesCache} language={language}></Search>
      <Pokemon></Pokemon>
    </div>
  );
}

export default App;
