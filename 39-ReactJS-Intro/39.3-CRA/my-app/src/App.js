import React from "react";
import "./App.css";
import items from "./items";
import ShoppingCart from "./ShoppingCart";
import moreItems from "./moreItems";
import Alert from "./Alert";

function App() {
  return (
    <div>
      <Alert variant='success'>
        <h1>Welcome Back!</h1>
      </Alert>
      <Alert variant='danger'>
        <h1>Oh-no!</h1>
      </Alert>
      <ShoppingCart items={items} username='Carly' />
      <ShoppingCart items={moreItems} username='Jin' />
    </div>
  );
}

export default App;
