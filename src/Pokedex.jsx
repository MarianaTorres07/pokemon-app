import "./assets/css/Pokedex.css";
import { useState } from "react";
import PokemonList from "./PokemonList";
import Finder from "./Finder";


function App() {
   //States
    const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
    const [viewMode, setViewMode] = useState("list"); // Estado para el modo de vista

    const handleSearch = (term) => {
        setSearchTerm(term);
    }

    const handleViewModeChange = (mode) => {
       setViewMode(mode);
   }
  

   //JSX
  return (
    <div className="app_container">
      <div className="main_card">
      
        {/* Contenido */}
        <div className="card_content">
          <Finder 
            onSearch={handleSearch}
            onViewModeChange={handleViewModeChange}
            viewMode={viewMode}
          />
          <PokemonList 
            searchTerm={searchTerm}
            viewMode={viewMode}
          />
        </div>
      </div>
    </div>
   )
}

export default App
