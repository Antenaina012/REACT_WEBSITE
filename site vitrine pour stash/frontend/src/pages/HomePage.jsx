import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import './HomePage.css';

// base collection available to everyone
const PRODUCTS = [
  {
    id: 1,
    image: '/images/maki-sifaka.svg',
    imageAlt: 'Maki Sifaka',
    name: 'Maki Sifaka',
    description: 'Peluche blanche, moelleuse et dansante — idéale pour câlins',
    price: '45 000 Ar',
  },
  {
    id: 2,
    image: '/images/maki-couronne.svg',
    imageAlt: 'Maki Couronne',
    name: 'Maki Couronné',
    description: 'Pelage majestueux, grand format pour gros câlins',
    price: '55 000 Ar',
  },
  {
    id: 3,
    image: '/images/maki-nocturne.svg',
    imageAlt: 'Maki Nocturne',
    name: 'Maki Nocturne',
    description: 'Texture ultra-douce, parfait pour la nuit',
    price: '49 000 Ar',
  },
  {
    id: 4,
    image: '/images/maki-bebe.svg',
    imageAlt: 'Maki Bebe',
    name: 'Maki Bébé',
    description: 'Petit format, compagnon de voyage et doudou',
    price: '35 000 Ar',
  },
];

// additional articles réservés aux utilisateurs connectés
const PREMIUM_PRODUCTS = [
  {
    id: 5,
    image: '/images/maki-royal.svg',
    imageAlt: 'Maki Royal',
    name: 'Maki Royal (Premium)',
    description: 'Edition limitée avec couronne dorée, réservée aux membres.',
    price: '120 000 Ar',
    premium: true,
  },
  {
    id: 6,
    image: '/images/maki-noir.svg',
    imageAlt: 'Maki Noir',
    name: 'Maki Noir (Premium)',
    description: 'Peluches noire ultra-rare pour clients privilégiés.',
    price: '150 000 Ar',
    premium: true,
  },
];

export default function HomePage() {
  const { user } = useAuth();
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h2>Peluches Malgaches — Le Maki à l'honneur</h2>
          <p>Découvrez nos makis artisanaux, inspirés de la faune unique de Madagascar. Douceur, qualité et savoir-faire local.</p>
          <a href="#produits" className="btn btn-primary">
            Voir la collection Maki
          </a>
        </div>
      </section>

      {/* Products Section */}
      <section className="products" id="produits">
        <div className="products-container">
          <h2>Collection Maki — Peluches Malgaches</h2>
          <div className="products-grid">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {/* show premium items only when the user is authenticated */}
            {user && PREMIUM_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="about-container">
          <h2>Qui sommes-nous?</h2>
          <p>
            Stash Mada est une petite entreprise malgache créée pour célébrer la faune unique de Madagascar.
            Chaque peluche est fabriquée avec amour, en utilisant des matériaux doux et respectueux de l'environnement.
            Nous nous engageons à soutenir l'artisanat local et à mettre en avant la beauté de nos créatures.
          </p>
          <p>
            Les makis sont des lémuriens emblématiques de Madagascar. Avec leurs queues annelées et leurs
            yeux expressifs, ils incarnent la beauté sauvage de notre île.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-container">
          <h2>Prêt à rejoindre la famille Stash?</h2>
          <p>Créez un compte pour accéder à des offres exclusives et suivre vos commandes.</p>
          <Link to="/login" className="btn btn-primary">
            Commencer
          </Link>
        </div>
      </section>
    </div>
  );
}
