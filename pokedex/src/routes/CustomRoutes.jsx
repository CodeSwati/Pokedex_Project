
import { Routes, Route } from "react-router-dom";
import Pokedex from "../Components/Pokedex/Pokedex";
import PokemonDetails from "../Components/PokemonDetails/PokemonDetails";

function CustomRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Pokedex />} /> //means kon se path pe konsa element render hoga.
            <Route path="/pokemon/:id" element={<PokemonDetails />} />
        </Routes>
    );
}

export default CustomRoutes;