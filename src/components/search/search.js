import React, { useEffect, useState } from "react";
import SearchResults from "../searchResults/searchResults";
import './search.css';

const Search = ({ pokemonCache, speciesCache, language, handleSpeciesCache, loadSpecies }) => {

    const [searchtext, setSearchtext] = useState('');

    const [filteredPokemon, setFilteredPokemon] = useState(pokemonCache);

    const handleSearch = ({ target }) => {
        setSearchtext(target.value);
    }

    useEffect(() => {
        if (searchtext && searchtext !== '') {
            const filtered = pokemonCache.filter(pokemon => {
                return pokemon.name.includes(searchtext.toLowerCase());
            })
            setFilteredPokemon(filtered);
        }
        else {
            setFilteredPokemon(pokemonCache);
        }
    }, [searchtext, pokemonCache])

    return (
        <div className="mh">
            <div className="content">
                <div className="search-wrapper">
                    <label htmlFor="pokemon-search">Search for pokemons:</label>
                    <input type="search" placeholder="Suche" id="pokemon-search" onChange={handleSearch} />
                    <div className="result-wrapper">
                        <ul>
                            {filteredPokemon.map(pokemon => {
                                return speciesCache.find(el => el.id === Number(pokemon.id)) ? <SearchResults key={pokemon.id} pokemon={speciesCache.find(el => el.id === Number(pokemon.id))} isSpecies={true} language={language} /> : <SearchResults pokemon={pokemon} key={pokemon.id} isSpecies={false} handleSpeciesCache={handleSpeciesCache} loadSpecies={loadSpecies}></SearchResults>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search