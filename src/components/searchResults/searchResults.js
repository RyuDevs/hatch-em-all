import {useEffect, useMemo, useRef} from "react";
import ditto from "../images/ditto.png";
import PokemonSearchResult from "../pokemonSearchResult/pokemonSearchResult";
import SpeciesSearchResult from "../speciesSearchResult/speciesSearchResult";

const SearchResults = ({pokemon, language, isSpecies, handleSpeciesCache, loadSpecies}) => {
    const pokemonImage = useRef(null);
    const lazyLoadingImage = (entries, observer) => {
        const [ entry ] = entries;
        if (entry.isIntersecting) {
            let lazyImage = entry.target;
            lazyImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${lazyImage.id}.png`
        }
    }

    const options = useMemo(() => {
        return {
        root: null,
        rootMargin: "0px",
        treshold: 1.0}
    }, []);

    useEffect(() => {
        const image = pokemonImage.current;
        const observer = new IntersectionObserver(lazyLoadingImage, options);
        if (image) observer.observe(image);

        return () => {
            if(image) observer.unobserve(image);
        }
    }, [pokemonImage, options]);

    return (
        <a href={`pokemon/${pokemon.id}`}>
            <div className="result">
                <img ref={pokemonImage} src={ditto} alt={pokemon.name} id={pokemon.id}></img>
                {isSpecies ? <SpeciesSearchResult pokemon={pokemon} language={language}/> : <PokemonSearchResult pokemon={pokemon} handleSpeciesCache={handleSpeciesCache} loadSpecies={loadSpecies}/>}
            </div>
        </a>
        ) 
}

export default SearchResults;