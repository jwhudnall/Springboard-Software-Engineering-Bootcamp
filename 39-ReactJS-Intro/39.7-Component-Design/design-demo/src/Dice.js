import React, { useState } from "react";
import Die from "./Die";
import "./Dice.css";

const Dice = ({ numDice = 6, title = "Main Game", maxVal = 20 }) => {
  const [numbers, setNumbers] = useState([...Array(numDice)]);
  const rollDice = () =>
    setNumbers((numbers) => numbers.map((n) => Math.floor(Math.random() * maxVal) + 1));

  return (
    <div className='Dice'>
      <h2>{title}</h2>
      <div>
        {numbers.map((num, idx) => (
          <Die val={num} />
        ))}
      </div>
      <button className='Dice-roll-btn' onClick={rollDice}>
        Roll
      </button>
    </div>
  );
};

export default Dice;
