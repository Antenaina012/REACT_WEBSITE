import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Stash Mada</h3>
          <p>Peluches malgaches artisanales inspirées de la faune unique de Madagascar.</p>
        </div>

        <div className="footer-section">
          <h4>Liens rapides</h4>
          <ul>
            <li><a href="#produits">Collection Maki</a></li>
            <li><a href="#about">À propos</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: boutique@stash.mg</p>
          <p>Localisation: Antananarivo, Madagascar</p>
        </div>

        <div className="footer-section social">
          <h4>Nous suivre</h4>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Stash Mada - Peluches Malgaches | Fabriqué à Madagascar</p>
      </div>
    </footer>
  );
}
