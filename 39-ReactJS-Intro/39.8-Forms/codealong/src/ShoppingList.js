import React, { useState } from "react";
import Item from "./Item";

const ShoppingList = () => {
  const INITIAL_STATE = [
    { id: 1, name: "Peanut Butter", qty: 2 },
    { id: 2, name: "Whole Milk", qty: 1 }
  ];
  const [items, setItems] = useState(INITIAL_STATE);
  return (
    <div>
      <h3>Shopping List</h3>
      {items.map((item) => (
        <Item key={item.id} name={item.name} qty={item.qty} id={item.id} />
      ))}
    </div>
  );
};

export default ShoppingList;
