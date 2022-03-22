import "./App.css";
import Pokedex from "./Pokedex";
import pokemon from "./pokemonDB";
// import pokemon from "./pokemonDB";

function App() {
  return (
    <>
      <Pokedex pokemon={pokemon} />
    </>
  );
}

export default App;
