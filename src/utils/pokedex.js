import Endpoints from "./endpoints";

export default class Pokedex {
    async getPokemons() {
        const response = await fetch(Endpoints.pokemons);
        if (response.status !== 200) {
            console.error('Error:', response.statusText);
        }
        const result = await response.json();
        const regexpIds = new RegExp(`(?:/)[0-9]{1,5}`, "g");
        const macthIds = new RegExp(`[0-9]{1,5}`, "g");
        for (const pokemon of result.results){
            const match=pokemon.url.match(regexpIds)
            const idMatch = match[0].match(macthIds);
            pokemon.id = idMatch
        }
        return result;
    }

    async getPokemon(id){
        const response = await fetch(Endpoints.pokemon + id);
        if (response.status !== 200) {
            console.error('Error:', response.statusText);
        }
        const result = await response.json();
        return result;
    }

    async getSpecies(id){
        const response = await fetch(Endpoints.species + id);
        if (response.status !== 200) {
            console.error('Error:', response.statusText);
        }
        const result = await response.json();
        return result;
    }
}