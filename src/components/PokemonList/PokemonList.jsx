
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";
import usePokemonList from "../hooks/usePokemonList";

function PokemonList() {
    
    const {pokemonListState,setPokemonListState} =usePokemonList('https://pokeapi.co/api/v2/pokemon',false);
    return (
        <div className="pokemon-list-wrapper">
            <div className="pokemon-wrapper">
                {(pokemonListState.isLoading) ? ' Loading....' :
                    pokemonListState.pokemonList.map((pokemon) => <Pokemon name={pokemon.name} image={pokemon.image} key={pokemon.id} id={pokemon.id} />)
                }
            </div>
            <div className="controls">
                <button disabled={pokemonListState.prevUrl == null} onClick={() => setPokemonListState({ ...pokemonListState, pokedexUrl: pokemonListState.prevUrl })}>Previous</button>
                <button disabled={pokemonListState.nextUrl == null} onClick={() => setPokemonListState({ ...pokemonListState, pokedexUrl: pokemonListState.nextUrl })}>Next</button>
            </div>
        </div>
    );
}

export default PokemonList;
