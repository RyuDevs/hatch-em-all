import React, { useEffect, useState } from "react";
import SearchResults from "../searchResults/searchResults";
import './search.css';

const Search = ({pokemonCache, speciesCache, language}) => {

    const [searchtext, setSearchtext] = useState('');
    
    const [filteredPokemon, setFilteredPokemon] = useState(pokemonCache);


    const handleSearch = ({target}) => {
        setSearchtext(target.value);
    }

    useEffect(() => {
        if (searchtext && searchtext !== ''){
            const filtered = pokemonCache.filter(pokemon =>
                {
                    return pokemon.name.includes(searchtext.toLowerCase());
                })
            setFilteredPokemon(filtered);
        }
        else {
            setFilteredPokemon(pokemonCache);
        }
    }, [searchtext, pokemonCache])



    return(
        <div className="mh">
            <div className="content">
            <div className="search-wrapper">
                <label htmlFor="pokemon-search">Search for pokemons:</label>
                <input type="search" placeholder="Suche" id="pokemon-search" onChange={handleSearch}/>
                <ul>
                    {filteredPokemon.map(pokemon => {
                        return <SearchResults pokemon={pokemon} key={pokemon.id} isSpecies="false"></SearchResults>
                    })}
                </ul>
            </div>
            </div>
        </div>
    )
}

export default Search