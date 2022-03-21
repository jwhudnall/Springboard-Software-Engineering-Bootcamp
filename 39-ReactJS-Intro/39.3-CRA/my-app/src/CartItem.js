const CartItem = ({ name, price, quantity, img }) => {
  return (
    <div>
      <h4>{name}</h4>
      <img src={img} width='100' />
      <ul>
        <li>Price: ${price}</li>
        <li>Qty: {quantity}</li>
        <li>Subtotal: ${price * quantity}</li>
      </ul>
    </div>
  );
};

export default CartItem;
