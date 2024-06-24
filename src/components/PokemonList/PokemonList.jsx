import { useEffect, useState } from "react";
import axios from 'axios';
import './PokemonList.css'
import Pokemon from "../Pokemon/Pokemon";

function PokemonList(){
    const [pokemonList, setPokemonList] = useState([]);
    const[isLoading,setIsLoading] = useState(true);
    const [pokedexUrl,setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon')
    const [nexUrl,setNextUrl] =useState("")
    const [prevUrl,setPrevUrl] =useState("")

    async function downloadPokemon(){
        setIsLoading(true);
        const response = await axios.get(pokedexUrl) //after ek inc pe effect called nhi ayega bcoz of empty array and downloads list of 20 pokemons
        const pokemonResults = response.data.results; // we get the array of pokemon from results
        console.log(response.data); 
        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);
        //iterating over the array of problems and using their url to create an array of promises that will download those 20 pokemons
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
        console.log(pokemonResultPromise)
        const pokemonData = await axios.all(pokemonResultPromise) //axios.all agar promises array se pass kre sara data layega download hone pe
        console.log(pokemonData);
        //now iterate on the data of each pokemon and extract id name image and types
        const res = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return{
                id: pokemon.id,
                name: pokemon.name,
                image:(pokemon.sprites.other)? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny ,
                types: pokemon.types
            }
        });
        console.log(res);
        setPokemonList(res);
        setIsLoading(false);
    }
    useEffect(() => {
       downloadPokemon();
    },[pokedexUrl]
//useeffect mai data ko download
    );
    

     return(
        
    <div className="pokemon-list-wrapper">
        {/* <div><h1>Pokemon List</h1></div> */}
        <div className="pokemon-wrapper">
            {(isLoading)? ' Loading....' :
            pokemonList.map((pokemon) => <Pokemon name={pokemon.name} image={pokemon.image} key ={pokemon.id} id = {pokemon.id}/>)
            }
        </div>
        <div className="controls">
            <button disabled = {prevUrl == null} onClick={() => setPokedexUrl(prevUrl)}>Previous</button>
            <button disabled = {nexUrl == null} onClick={() => setPokedexUrl(nexUrl)}>Next</button>
        </div>
    </div>
)
}
export default PokemonList;