import React from 'react';
import { useCart } from '../context/CartContext';
import './CartPage.css';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, total } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <h2>Votre panier est vide</h2>
        <p>Ajoutez des articles pour commencer.</p>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Mon panier</h2>
      <ul className="cart-items">
        {cart.map((item) => (
          <li key={item.id} className="cart-item">
            <div className="item-info">
              <div className="item-emoji">{item.emoji}</div>
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
            </div>
            <div className="item-controls">
              <div className="quantity">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-total">
        <span>Total:</span>
        <span>{total} Ar</span>
      </div>
    </div>
  );
}
