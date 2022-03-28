import React, { useState } from "react";
import Item from "./Item";
import NewItemForm from "./NewItemForm";
import { v4 as uuidv4 } from "uuid";

const ShoppingList = () => {
  const INITIAL_STATE = [
    { id: uuidv4(), name: "Peanut Butter", qty: 2 },
    { id: uuidv4(), name: "Whole Milk", qty: 1 }
  ];
  const [items, setItems] = useState(INITIAL_STATE);

  // Adds new item to list. Expects a newItem object.
  const addItem = (newItem) => {
    setItems((items) => [...items, { ...newItem, id: uuidv4() }]);
  };
  return (
    <div>
      <h3>Shopping List</h3>
      <NewItemForm addItem={addItem} />
      {items.map((item) => (
        <Item key={item.id} name={item.name} qty={item.qty} id={item.id} />
      ))}
    </div>
  );
};

export default ShoppingList;
