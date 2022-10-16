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
  // const [speciesToAdd, setSpeciesToAdd] = useState([]);
  const [language, setLanguage] = useState('de');

  useEffect(() => {

    async function getPokemon() {
      const pokeData = await myPokedex.getPokemons();
      setPokemonCache(pokeData.results);
    }

    getPokemon();
  }, [myPokedex]);

  // useEffect(() => {
  //   console.log(`Species cache changed`);
  //   console.log(speciesCache);
  // }, [speciesCache]);

  const handleSpeciesCache = (speciesData) =>{
    setSpeciesCache(prev => {
      if(!prev.find(element => element.id === speciesData.id)){
        return [...prev, speciesData];
      }
      else{
        return [...prev];
      }
    })
  }

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
      <Search pokemonCache={pokemonCache} speciesCache={speciesCache} language={language} handleSpeciesCache={handleSpeciesCache} loadSpecies={myPokedex.getSpecies}></Search>
      <Pokemon></Pokemon>
    </div>
  );
}

export default App;
