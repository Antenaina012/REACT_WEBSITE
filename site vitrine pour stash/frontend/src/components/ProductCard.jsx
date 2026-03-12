import React from 'react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    // ask user how many units they want to add
    const answer = window.prompt('Combien de peluches souhaitez-vous ajouter ?', '1');
    const qty = parseInt(answer, 10);
    if (!qty || qty < 1) {
      return; // cancelled or invalid
    }
    addToCart(product, qty);
    alert(`${qty} x ${product.name} ajouté${qty > 1 ? 's' : ''} au panier`);
  };

  return (
    <div className="product-card">
      {product.premium && <span className="premium-badge">Premium</span>}
      <div className="product-image">
        <img src={product.image} alt={product.imageAlt || product.name} loading="lazy" />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-footer">
          <span className="price">{product.price}</span>
          <button className="btn btn-add-cart" onClick={handleAddToCart}>
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}
