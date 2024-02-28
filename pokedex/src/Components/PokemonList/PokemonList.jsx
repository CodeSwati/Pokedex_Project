import { useEffect, useState } from "react";
import axios from 'axios' //this is alternative of fetch api
import './PokemonList.css'
import Pokemon from '../Pokemon/Pokemon';

function PokemonList() {
    const[PokemonList,setPokemonList] = useState([]);
    const[isLoading,setIsLoading] = useState(true);
    const [pokedox_url, setPokedox_url]= useState('https://pokeapi.co/api/v2/pokemon');

    const[nextUrl,setNextUrl]=useState('');
    const[prevUrl,setPrevUrl]=useState('');

    async function downloadPokemons(){
        setIsLoading(true);
        const response= await axios.get(pokedox_url); //this downloads list of 20 pokemons
        const pokemonResults = response.data.results;// we get array of pokemons from result
        console.log(response.data);
        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);

        //iterating over the array of pokemons,and using their url to create an array of promises
        //that will download those 20 pokemons

        const pokemonResultsPromise= pokemonResults.map((pokemon)=>axios.get(pokemon.url));

        //passing that promise array to axios.all
        const pokemonData = await axios.all(pokemonResultsPromise); //array of 20 pokemon detailed data
        console.log(pokemonData);

        //now iterate on the data of each pokemon and extract id, name,iamge,type
        const PokeListResult= pokemonData.map((pokeData) => {
            const pokemon= pokeData.data;
            return{
                id:pokemon.id,
                name:pokemon.name, 
                image:(pokemon.sprites.other)? pokemon.sprites.other.dream_world.front_default:pokemon.springs, 
                types:pokemon.types
            };
        });
        console.log(PokeListResult);
        setPokemonList(PokeListResult);
        setIsLoading(false);
    }

    useEffect(()=>{
        downloadPokemons();
    },[pokedox_url]);
   

   return (
   <div className="pokemon-list-wrapper">
     
     <div className="pokemon-wrapper">
        {(isLoading)?'Loading.....': 
        PokemonList.map((p)=>< Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />)
        }
     </div>
     <div className="controls">
        <button disabled={prevUrl==null} onClick={()=> setPokedox_url(prevUrl) }>Prev</button>
        <button disabled={nextUrl==null} onClick={()=> setPokedox_url(nextUrl)}>Next</button>
     </div>
     
   </div>
   )
}

export default PokemonList;