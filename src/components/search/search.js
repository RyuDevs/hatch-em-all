import React, { useEffect, useState } from "react";
import './search.css';

const Search = ({pokemons}) => {

    const [searchtext, setSearchtext] = useState('');
    const [filteredPokemon, setFilteredPokemon] = useState(pokemons);

    const handleSearch = ({target}) => {
        setSearchtext(target.value);
    }

    useEffect(() => {
        if (searchtext && searchtext !== ''){
            const filtered = pokemons.filter(pokemon =>
                {
                    return pokemon.name.includes(searchtext);
                })
            setFilteredPokemon(filtered);
        }
        else {
            setFilteredPokemon(pokemons);
        }
    }, [searchtext, pokemons])

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