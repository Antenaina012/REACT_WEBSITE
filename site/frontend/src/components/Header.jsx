import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Header.css';

export default function Header() {
  const { user, logout } = useAuth();
  // pull both the cart array and the derived totalCount value directly
  const { cart, totalCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="brand">
            <h1>Stash Madagasikara 🐒</h1>
          </Link>

          <ul className="nav-links">
            <li>
              <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Accueil</Link>
            </li>
            <li>
              <a href="#produits">Collection</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>

          <div className="nav-right">
            <Link to="/cart" className="cart-badge">
              🛒 ({totalCount || 0})
            </Link>
            {user ? (
              <div className="user-menu">
                <span className="user-name">{user.nom}</span>
                <button onClick={handleLogout} className="btn-logout">
                  Déconnexion
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn-login">
                Connexion
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
