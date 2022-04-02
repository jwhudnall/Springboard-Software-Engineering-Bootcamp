import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "./Card";
import "./Deck.css";
// 1. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card.
// 2. Every time you click the button, display a new card, until there are no cards left in the deck. If you try to draw when there are no cards remaining, an alert message should appear on the screen with the text “Error: no cards remaining!”.

const Game = () => {
  // const [deckIsDisplayed, setDeckIsDisplayed] = useState(false);
  const [deckId, setDeckId] = useState(null);
  const [url, setUrl] = useState("http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
  const [deck, setDeck] = useState([]);
  const cardBtn = useRef();

  const randRotation = () => {
    const angle = Math.random() * 90 - 45;
    const randomX = Math.random() * 40 - 20;
    const randomY = Math.random() * 40 - 20;
    return `${randomX}px, ${randomY}px) rotate(${angle}deg`;
  };

  useEffect(() => {
    async function getDeck() {
      try {
        const res = await axios.get(url);
        setDeckId(res.data.deck_id);
      } catch (e) {
        alert("Something went wrong communicating with the deckofcardsapi.");
      }
    }
    getDeck();
  }, []);

  const handleClick = async () => {
    try {
      if (deck.length < 52) {
        const url = `http://deckofcardsapi.com/api/deck/${deckId}/draw`;
        const res = await axios.get(url);
        const card = res.data.cards[0];
        setDeck((deck) => {
          return [...deck, { code: card.code, image: card.image, rotation: randRotation() }];
        });
        console.log(deck);
      } else {
        cardBtn.current.disabled = true;
      }
    } catch (e) {
      alert("Something went wrong communicating with the deckofcardsapi.");
    }
  };

  return (
    <div>
      <button onClick={handleClick} ref={cardBtn}>
        GIMME A CARD!
      </button>
      <div className='Deck'>
        {deck &&
          deck.map((c, idx) => {
            return <Card key={idx} img={c.image} rotation={c.rotation} />;
          })}
      </div>
    </div>
  );
};

export default Game;
