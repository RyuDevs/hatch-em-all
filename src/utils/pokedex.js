import Endpoints from "./endpoints";

export default class Pokedex {
    async getPokemons() {
        const response = await fetch(Endpoints.pokemons);
        if (response.status !== 200) {
            console.error('Error:', response.statusText);
        }
        const result = await response.json();
        return result;
    }
}