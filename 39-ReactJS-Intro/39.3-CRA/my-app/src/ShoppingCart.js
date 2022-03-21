import CartItem from "./CartItem";

// import React from "react";
const ShoppingCart = ({ items, username }) => {
  const total = items.reduce((acc, next) => {
    return acc + next.price * next.quantity;
  }, 0);
  return (
    <div>
      <h1>{username}'s Shopping Cart</h1>
      <div>
        {items.map((i) => (
          <CartItem name={i.name} img={i.img} price={i.price} quantity={i.quantity} />
        ))}
      </div>
      <div>
        <span>Cart Subtotal: ${total}</span>
      </div>
    </div>
  );
};

export default ShoppingCart;
