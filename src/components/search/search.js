import React, { useState } from "react";
import './search.css';

const Search = ({pokemons}) => {

    const [filteredPokemon, setFilteredPokemon] = useState(pokemons);

    const handleSearch = ({target}) => {
        if (!target.value && target.value !== ''){
            setFilteredPokemon(pokemons.filter(pokemon => pokemon.name.includes(target.value)));
        }
        return
    }

    return(
        <div className="mh">
            <div className="content">
            <div className="search-wrapper">
                <label htmlFor="pokemon-search">Search for pokemons:</label>
                <input type="search" placeholder="Suche" id="pokemon-search" onChange={handleSearch}/>
            </div>
            <div className="search-results-wrapper">
                <ul>
                    {filteredPokemon.map(pokemon => {
                        return <li key={pokemon.name}>{pokemon.name}</li>
                    })}
                </ul>
            </div>
            </div>
        </div>
    )
}

export default Search