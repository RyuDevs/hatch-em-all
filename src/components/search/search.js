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
                        return (
                        <div className="card" key={pokemon.name}>
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/35.png"></img>
                            <span>{pokemon.name}</span>
                        </div>)
                    })}
                </ul>
            </div>
            </div>
        </div>
    )
}

export default Search