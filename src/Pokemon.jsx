import "./index.css";
import "./pokemon.css";
import { useEffect, useState } from "react";
import { Pokemoncards } from "./Pokemoncards";

export const Pokemon = () => {
  const [pokemon, setpokemon] = useState(null);
  const [lodingState, setlodingState] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const API = "https://pokeapi.co/api/v2/pokemon?limit=124";
  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      const pokemonData = data.results.map(async (currPokemon) => {
        const res = await fetch(currPokemon.url);
        const data = await res.json();
        return data;
      });
      const detailedResonse = await Promise.all(pokemonData);
      setpokemon(detailedResonse);
      setlodingState(false);
    } catch (error) {
      console.log(error);
      setError(error);
      setlodingState(false);
    }
  };
  useEffect(() => {
    fetchPokemon();
  }, []);

  if (lodingState) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <h1>Error :- {error.message}</h1>
      </div>
    );
  }
  const searchData = pokemon.filter((currPokemon) =>
    currPokemon.name.toLowerCase().includes(search.toLocaleLowerCase())
  );
  return (
    <section className="container">
      <header>
        <h1> Lets Catch Pokémon</h1>
      </header>
      <div className="pokemon-search">
        <input
          type="text"
          placeholder="Search Pokemon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
      </div>
      <ul className="cards">
        {searchData.map((currPokemon) => {
          return (
            <Pokemoncards key={currPokemon.id} pokemonData={currPokemon} />
          );
        })}
      </ul>
    </section>
  );
};
