import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import "./Cart.css";

const Cart = () => {
  const { cart, removeFromCart, decreaseQty, increaseQty, clearCart } = useContext(CartContext);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="cart-empty">Your cart is empty</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p>
                    ${item.price} × {item.quantity} = ${item.price * item.quantity}
                  </p>
                </div>
                <div className="cart-actions">
                  <button className="decrease" onClick={() => decreaseQty(item.id)}>
                    -
                  </button>
                  <button className="increase" onClick={() => increaseQty(item.id)}>
                    +
                  </button>
                  <button className="remove" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-footer">
            <h3>Total: ${total}</h3>
            <button onClick={clearCart}>Clear Cart</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
