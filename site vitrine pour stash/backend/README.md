# Backend PostgreSQL - Stash

## 1) Creer la base et la table

Dans PostgreSQL, cree la base puis execute `database.sql`:

```sql
CREATE DATABASE stash_db;
```

Puis, dans la base `stash_db`, execute le contenu de `../database.sql`.

## 2) Configurer les variables d'environnement

Dans `backend`, copie `.env.example` vers `.env` puis adapte les valeurs:

- `DB_HOST`
- `DB_PORT`
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`

## 3) Installer et lancer l'API

Depuis `site vitrine pour stash/backend`:

```bash
npm install
npm start
```

L'API tourne sur `http://localhost:3000`.

## 4) Endpoints

- `POST /api/signup`
  - body JSON: `{ "nom": "...", "email": "...", "mot_de_passe": "..." }`
- `POST /api/login`
  - body JSON: `{ "email": "...", "mot_de_passe": "..." }`

La page `homepage.html` appelle deja ces endpoints.
