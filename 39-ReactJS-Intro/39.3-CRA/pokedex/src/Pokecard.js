import "./Pokecard.css";

const Pokecard = ({ name, img, type, base_experience }) => {
  return (
    <div className='Pokecard'>
      <h4 className='Pokecard-header'>{name}</h4>
      <img className='Pokecard-img' src={img} alt='' />
      <ul className='Pokecard-ul'>
        <li className='Pokecard-ul-li'>Type: {type}</li>
        <li className='Pokecard-ul-li'>EXP: {base_experience}</li>
      </ul>
    </div>
  );
};

export default Pokecard;
