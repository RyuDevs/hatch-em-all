const SpeciesSearchResult = ({pokemon, language}) => {
    return (
        language === 'de' ? <span>{pokemon.names[5].name}</span> : <span>{pokemon.name}</span>
    )
}

export default SpeciesSearchResult