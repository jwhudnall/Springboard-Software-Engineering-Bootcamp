import CartItem from "./CartItem";
import "./ShoppingCart.css";

// import React from "react";
const ShoppingCart = ({ items, username }) => {
  const total = items.reduce((acc, next) => {
    return acc + next.price * next.quantity;
  }, 0);
  return (
    <div className='ShoppingCart'>
      <h1 className='ShoppingCart-header'>{username}'s Shopping Cart</h1>
      <div>
        {items.map((i) => (
          <CartItem key={i.id} name={i.name} img={i.img} price={i.price} quantity={i.quantity} />
        ))}
      </div>
      <div>
        <span>Cart Subtotal: ${total}</span>
      </div>
    </div>
  );
};

export default ShoppingCart;
