import Endpoints from "./endpoints";

export default class Pokedex {
    async getPokemons() {
        const response = await fetch(Endpoints.pokemons);
        if (response.status !== 200) {
            console.error('Error:', response.statusText);
        }
        const result = await response.json();
        const regexpIds = new RegExp(`(?<=/)[0-9]{1,5}`, "g");
        for (const pokemon of result.results){
            const match=pokemon.url.match(regexpIds)
            pokemon.id = match;
        }
        return result;
    }

    async getPokemon(name){
        const response = await fetch(Endpoints.pokemon + name);
        if (response.status !== 200) {
            console.error('Error:', response.statusText);
        }
        const result = await response.json();
        return result;
    }

    async getSpecies(name){
        const response = await fetch(Endpoints.species + name);
        if (response.status !== 200) {
            console.error('Error:', response.statusText);
        }
        const result = await response.json();
        return result;
    }
}