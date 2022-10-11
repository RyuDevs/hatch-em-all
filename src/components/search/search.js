import React, { useEffect, useState } from "react";
import SearchResults from "../searchResults/searchResults";
import './search.css';

const Search = ({pokemons, speciesInfo, species}) => {

    const [searchtext, setSearchtext] = useState('');
    
    const [filteredPokemon, setFilteredPokemon] = useState(pokemons);


    const handleSearch = ({target}) => {
        setSearchtext(target.value);
    }

    useEffect(() => {
        if (searchtext && searchtext !== ''){
            const filtered = pokemons.filter(pokemon =>
                {
                    return pokemon.name.includes(searchtext.toLowerCase());
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
                <ul>
                    {filteredPokemon.map(pokemon => {
                        return <SearchResults pokemon={pokemon} key={pokemon.name} speciesInfo={speciesInfo}></SearchResults>
                    })}
                </ul>
            </div>
            </div>
        </div>
    )
}

export default Search