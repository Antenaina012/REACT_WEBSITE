# Stash Mada - Frontend (React)

Frontend moderne et responsif pour la boutique de peluches malgaches Stash Mada.

## Architecture

```
frontend/
├── src/
│   ├── components/          # Composants réutilisables
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── ProductCard.jsx
│   ├── pages/              # Pages principales
│   │   ├── HomePage.jsx
│   │   └── LoginPage.jsx
│   ├── services/           # Services API
│   │   └── authService.js
│   ├── context/            # State Management
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   ├── styles/             # Fichiers CSS globaux
│   ├── App.jsx
│   ├── main.jsx
│   └── ...
├── index.html
├── vite.config.js
└── package.json
```

## Installation

npm install
```

## Démarrage du serveur de développement

```bash
npm run dev
```

L'application sera accessible à `http://localhost:5173`
## Build pour la production

```bash
npm run build
```

Les fichiers optimisés seront générés dans le dossier `dist/`.
# notes:
#   - le formulaire de connexion (et d'inscription) demande désormais des informations de paiement et les stocke dans le contexte utilisateur
## Fonctionnalités

- ✅ Page d'accueil avec showcase des produits
- ✅ Système d'authentification (login/signup)
- ✅ Panier d'achat
- ✅ Design responsive
- ✅ Navigation fluide avec React Router
- ✅ État global avec React Context
 - ✅ État global avec React Context
 - ✅ Ajout de quantités personnalisées : une fenêtre demande combien d'unités ajouter au panier

## Technologies utilisées

- **React 18** - Framework UI
- **React Router 6** - Routage
- **Vite** - Build tool et dev server
- **Axios** - HTTP client
- **CSS3** - Styling (responsive design)

## Variables d'environnement

- `VITE_API_URL` - URL de l'API backend (défaut: http://localhost:3000)
- `VITE_APP_NAME` - Nom de l'application

## Dépendances principales

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.22.3",
  "axios": "^1.6.7"
}
```

## Structure des composants

### AuthContext
Gère l'authentification et l'état de l'utilisateur connecté.

```jsx
const { user, login, signup, logout, loading, error } = useAuth();
```

### CartContext
Gère le panier d'achat.

```jsx
const { cart, addToCart, removeFromCart, updateQuantity, clearCart, total } = useCart();
// addToCart(product, quantity) permet d'ajouter un montant variable
```

## Integration avec le backend

Le frontend se connecte à l'API backend via Axios. Les endpoints utilisés:

- `POST /api/signup` - Inscription
- `POST /api/login` - Connexion
- `GET /api/health` - Vérification de santé de l'API

## Développement

Pour ajouter une nouvelle page:

1. Créez un composant dans `src/pages/`
2. Ajoutez une route dans `src/App.jsx`
3. Créez un fichier CSS pour les styles

Exemple:
```jsx
// src/pages/ProductPage.jsx
export default function ProductPage() {
  return <div>Détails du produit</div>;
}

// src/App.jsx
<Route path="/products/:id" element={<ProductPage />} />
```

## Support

Pour toute question ou problème, contactez: boutique@stash.mg
