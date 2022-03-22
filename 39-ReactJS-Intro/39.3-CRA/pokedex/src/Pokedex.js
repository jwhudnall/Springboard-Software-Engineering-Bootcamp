import Pokecard from "./Pokecard";
import items from "./pokemonDB";
import "./Pokedex.css";

const Pokedex = ({ pokemon = items }) => {
  return (
    <div className='Pokedex'>
      <h1 className='Pokedex-header'>Pokedex</h1>
      <div className='Pokedex-container'>
        {pokemon.map((p) => (
          <Pokecard
            key={p.id}
            name={p.name}
            img={p.img}
            type={p.type}
            base_experience={p.base_experience}
          />
        ))}
      </div>
    </div>
  );
};

export default Pokedex;
