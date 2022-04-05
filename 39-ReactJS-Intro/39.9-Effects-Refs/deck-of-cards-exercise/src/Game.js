import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "./Card";
import "./Deck.css";

const BASE_URL = "http://deckofcardsapi.com/api/deck";

const Game = () => {
  const [deck, setDeck] = useState(null);
  const [drawn, setDrawn] = useState([]);
  const [autoDraw, setAutoDraw] = useState(false);
  const timerId = useRef(null);

  const toggleAutoDraw = () => {
    setAutoDraw((draw) => !draw);
  };

  const randRotation = () => {
    const angle = Math.random() * 90 - 45;
    const randomX = Math.random() * 40 - 20;
    const randomY = Math.random() * 40 - 20;
    return `${randomX}px, ${randomY}px) rotate(${angle}deg`;
  };

  useEffect(() => {
    async function getDeck() {
      try {
        const res = await axios.get(`${BASE_URL}/new/shuffle`);
        setDeck(res.data);
      } catch (e) {
        alert("Something went wrong communicating with the deckofcardsapi.");
      }
    }
    getDeck();
  }, [setDeck]);

  useEffect(() => {
    async function drawCard() {
      let { deck_id } = deck;

      try {
        const res = await axios.get(`${BASE_URL}/${deck_id}/draw`);

        if (res.data.remaining === 0) {
          setAutoDraw(false);
          throw new Error("no cards remaining!");
        }

        const card = res.data.cards[0];
        setDrawn((deck) => {
          return [...deck, { code: card.code, image: card.image, rotation: randRotation() }];
        });
      } catch (e) {
        alert("Something went wrong communicating with the deckofcardsapi.");
      }
    }

    if (autoDraw && !timerId.current) {
      timerId.current = setInterval(async () => {
        await drawCard();
      }, 1000);
    }

    return () => {
      clearInterval(timerId.current);
      timerId.current = null;
    };
  }, [autoDraw, setAutoDraw, deck]);

  return (
    <div>
      <button onClick={toggleAutoDraw}>{autoDraw ? "STOP" : "START"} DRAWING!</button>
      {/* <CardWrapper /> */}
      <div className='Deck'>
        {drawn &&
          drawn.map((c, idx) => {
            return <Card key={idx} img={c.image} rotation={c.rotation} />;
          })}
      </div>
    </div>
  );
};

export default Game;
