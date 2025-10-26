import { useState, useEffect, useCallback } from "react";
import "./assets/css/PokemonList.css";

//Componente para mostrar los pokemones en modo cuadricula
function PokemonGrid({name, image,types, abilities}) {
       const safeTypes = types || [];
        const safeAbilities = abilities || [];
        return (
            <div className="pokemon_card h-100">
                {/*imagen del pokemon*/}
                <div className="pokemon_image_card">
                    <img src={image} alt={name} className="pokemon_image"/>
                </div>
                {/*nombre del pokemon*/}
                <div className="pokemon_name_container">
                    <h2 className="pokemon_name text-start w-100 mb-2">{name}</h2>
                </div>
                 {/*Info del pokemon*/}
                    <div className="pokemon_info w-100">
                        <div className="left_section">
                            {/* Habilidades */}
                            <div className="pokemon_abilities_grid mb-2">
                                {safeAbilities.slice(0, 3).map((abilityInfo, index) => (
                                    <span key={index} className="ability_badge">
                                        {abilityInfo.ability.name}
                                    </span>
                                ))}
                            </div>
                            
                            {/* Contenedor para tipos y botón Shiny */}
                            <div className="types_and_shiny">
                                {/* Tipos a la izquierda */}
                                <div className="pokemon_types_grid">
                                    {safeTypes.map((typeInfo, index) => (
                                        <span key={index} className={`type_badge type_${typeInfo.type.name}`}>
                                            {typeInfo.type.name}
                                        </span>
                                    ))}
                                </div>
                                
                                {/* Botón Shiny a la derecha */}
                                <div className="right_section">
                                    <button className="shiny_button">Shiny</button>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>   
        )
}

//Componente para mostrar los pokemones en modo lista
function PokemonListItem({id, name, image,types, abilities}) {
    const safeTypes = types || [];
    const safeAbilities = abilities || [];

    return (
        <div className="pokemon_list_item d-flex align-items-center p-3 border-bottom">
            <span className="pokemon_number me-3 fw-bold">{id}</span>
            <h2 className="pokemon_name_list flex-grow-1 text-capitalize fw-bold">{name}</h2>
            <img src={image} alt={name} width="80" className="pokemon_image_list mx-3"/>

            <div className="pokemon_types_cell mx-3 d-none d-md-block">
                <div className="pokemon_types d-flex flex-wrap gap-1">
                    {safeTypes.map((typeInfo, index) => (
                         <span key={index}>
                            {typeInfo?.type?.name || 'Normal'}
                        </span>
                    ))}
                </div>
            </div>
            
            <div className="pokemon_abilities_cell mx-3 d-none d-lg-block">
                <div className="pokemon_abilities d-flex flex-wrap gap-1">
                    {safeAbilities.slice(0, 2).map((abilityInfo, index) => (
                        <span key={index}>
                             {abilityInfo?.ability?.name || 'Unknown'}
                        </span>
                    ))}
                </div>
            </div>
            <button className="shiny_button ms-3">Shiny</button>
        </div>
    )
}

// Headers para la vista lista
function ListHeaders() {
    return (
        <div className="list_headers d-flex align-items-center p-3 bg-secondary text-white rounded-top fw-bold">
            <span className="header_number me-3">#</span>
            <span className="header_name flex-grow-1">Nombre</span>
            <span className="header_preview mx-3">Vista Previa</span>
            <span className="header_types mx-3 d-none d-md-block">Tipos</span>
            <span className="header_abilities mx-3 d-none d-lg-block">Habilidades</span>
        </div>
    )
}

export default function PokemonList({searchTerm, viewMode}) {
  const [pokemons, setPokemon] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);

    useEffect(() => {
        const getPokemons = async () => {
            try {
            /* Llamar la Api del pokeApI */
            const response =await fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0")
            const listaPokemones =await response.json()
            setPokemon (listaPokemones.results) //almacenar la lista de pokemones en el estado
            

            const newPokemones = listaPokemones.results.map(async (pokemon) => {
                debugger;
                const res = await fetch (pokemon.url);
                const poke = await res.json();

                return{
                    id: poke.id,
                    name: poke.name, 
                    image: poke.sprites.other.dream_world.front_default || poke.sprites.front_default,
                    types: poke.types || [],
                    abilities: poke.abilities || []
                }
            });

           const pokemonData = await Promise.all(newPokemones);
           setPokemon(pokemonData);
           setFilteredPokemons(pokemonData); // Inicialmente mostrar todos
        } catch (error) {
            console.error("Error fetching Pokémon data:", error);
        }
           
    };

    getPokemons(); //Llamar la función para obtener los pokemones
    }, []);

    // Filtrar pokemones cuando searchTerm cambie
        useEffect(() => {
            if (searchTerm) {
                const filtered = pokemons.filter(pokemon => 
                    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setFilteredPokemons(filtered);
            } else {
                // Si no hay término de búsqueda, mostrar todos
                setFilteredPokemons(pokemons);
            }
        }, [searchTerm, pokemons]);

        //Si no hay pokemones, mostrar error
        if (filteredPokemons.length === 0) {
            return (
                <section className="pokemon_container">
                    <div className="no-results">
                        <p>No se encontraron Pokémon con "{searchTerm}"</p>
                    </div>
                </section>
            );
}
    

    return (
        <section className={`pokemon_container ${viewMode}`}>
            {/* Mostrar headers solo en vista lista */}
            {viewMode === 'list' && <ListHeaders />}

            {filteredPokemons.map(pokemon => 
                viewMode === 'list' ?
                <div className="col-12" key={pokemon.id}>
                <PokemonListItem {...pokemon}/>
                </div> :
                <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={pokemon.id}>
                <PokemonGrid {...pokemon} />
                </div>
         )  }  
 
        </section>
    )
}


