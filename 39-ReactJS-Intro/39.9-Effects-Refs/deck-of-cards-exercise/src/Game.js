import React, { useState, useEffect } from "react";
import axios from "axios";
// 1. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card.
// 2. Every time you click the button, display a new card, until there are no cards left in the deck. If you try to draw when there are no cards remaining, an alert message should appear on the screen with the text “Error: no cards remaining!”.

const Game = () => {
  // const [deckIsDisplayed, setDeckIsDisplayed] = useState(false);
  const [deck, setDeck] = useState(null);
  const [url, setUrl] = useState("http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");

  useEffect(() => {
    async function getDeck() {
      try {
        const res = await axios.get(url);
        setDeck(res.data);
        console.log(deck);
      } catch (e) {
        alert("Something went wrong communicating with the deckofcardsapi.");
      }
    }
    getDeck();
  }, []);

  const handleClick = () => {
    // if deckIsDisplayed, retrieve another card from the api
    // else, fetch shuffled deck from api
  };

  return (
    <div>
      <button onClick={handleClick}>GIMME A CARD!</button>
    </div>
  );
};

export default Game;
