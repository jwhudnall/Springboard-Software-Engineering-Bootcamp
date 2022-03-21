import React from "react";
import "./App.css";
import items from "./items";
import ShoppingCart from "./ShoppingCart";
import moreItems from "./moreItems";

function App() {
  return (
    <div>
      <ShoppingCart items={items} username='Carly' />
      <ShoppingCart items={moreItems} username='Jin' />
    </div>
  );
}

export default App;
