import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonList(url,type){
    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl: url,
        nextUrl: '',
        prevUrl: ''
    });

async function downloadPokemon() {
    setPokemonListState({ ...pokemonListState, isLoading: true }); //setisloading ki jagah
    const response = await axios.get(pokemonListState.pokedexUrl); //after ek inc pe effect called nhi ayega bcoz of empty array and downloads list of 20 pokemons
    const pokemonResults = response.data.results; // we get the array of pokemon from results
    console.log(response.data);
    setPokemonListState((state) => ({
        ...state,
        nextUrl: response.data.next,
        prevUrl: response.data.previous
    }));
    //iterating over the array of problems and using their url to create an array of promises that will download those 20 pokemons
    if(type){
        console.log("typereq")
    }else{
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
        console.log(pokemonResultPromise);
        const pokemonData = await axios.all(pokemonResultPromise); //axios.all agar promises array se pass kre sara data layega download hone pe
        console.log(pokemonData);
        //now iterate on the data of each pokemon and extract id name image and types
        const res = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                types: pokemon.types
            };
        });
        console.log(res);
        setPokemonListState((state) => ({
            ...state,
            pokemonList: res,
            isLoading: false
    }));
}
}
useEffect(() =>{
    downloadPokemon();
},[pokemonListState.pokedexUrl] );
    return{pokemonListState,setPokemonListState}
}
export default usePokemonList;