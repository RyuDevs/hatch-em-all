import {useEffect, useMemo, useRef, useState} from "react";
import ditto from "../images/ditto.png";

const SearchResults = ({pokemon, speciesInfo}) => {
    const pokemonImage = useRef(null);
    const pokemonName = useRef(null);
    
    const [species, setSpecies] = useState(null);

    const lazyLoadingImage = (entries, observer) => {
        const [ entry ] = entries;
        if (entry.isIntersecting) {
            let lazyImage = entry.target;
            lazyImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${lazyImage.id}.png`
        }
    }

    const lazyLoadingName = async (entries, observer) => {
        const [ entry ] = entries;
        if (entry.isIntersecting) {
            let lazyName = entry.target.textContent;
            const data = await speciesInfo(lazyName);
            setSpecies(data);
            observer.unobserve(pokemonName.current);
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

    useEffect(() => {
        const name = pokemonName.current;
        const observer = new IntersectionObserver(lazyLoadingName, options);
        if (name) observer.observe(name);

        return() => {
            if(name) observer.unobserve(name);
        }
    }, [pokemonName, options])

    return (
        <a href={`pokemon/${pokemon.id}`}>
            <div className="result">
                <img ref={pokemonImage} src={ditto} alt={pokemon.name} id={pokemon.id}></img>
                {species ? <span>{species.names[5].name}</span> : <span ref={pokemonName}>{pokemon.name}</span>}
            </div>
        </a>
        ) 
}

export default SearchResults;