import {useRef, useEffect, useMemo} from 'react';

const PokemonSearchResult = ({pokemon, handleSpeciesCache, loadSpecies}) => {

    const pokemonName = useRef(null);

    const options = useMemo(() => {
        return {
        root: null,
        rootMargin: "0px",
        treshold: 1.0}
    }, []);

    const lazyLoadingSpecies = async (entries, observer) => {
        const [ entry ] = entries;
        if (entry.isIntersecting) {
            let id = entry.target.dataset.id;
            const result = await loadSpecies(id);
            handleSpeciesCache(result);
            observer.unobserve(pokemonName.current);
        }
    }

    useEffect(() => {
        const name = pokemonName.current;
        const observer = new IntersectionObserver(lazyLoadingSpecies, options);
        if (name) observer.observe(name);

        return() => {
            if(name) observer.unobserve(name);
        }
    }, [pokemonName, options])

    return (
        <span ref={pokemonName} data-id={pokemon.id}>{pokemon.name}</span>
    )
}

export default PokemonSearchResult