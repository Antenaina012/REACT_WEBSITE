const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const { Pool } = require("pg");
require("dotenv").config();

const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

app.use(cors());
app.use(express.json());

app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ ok: true, message: "API et PostgreSQL operationnels" });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Connexion PostgreSQL echouee" });
  }
});

app.post("/api/signup", async (req, res) => {
  const { nom, email, mot_de_passe } = req.body;

  if (!nom || !email || !mot_de_passe) {
    return res.status(400).json({ message: "Tous les champs sont obligatoires." });
  }

  try {
    const emailNormalise = String(email).trim().toLowerCase();
    const existing = await pool.query("SELECT id FROM comptes WHERE email = $1", [emailNormalise]);

    if (existing.rowCount > 0) {
      return res.status(409).json({ message: "Un compte existe deja avec cet email." });
    }

    const hash = await bcrypt.hash(String(mot_de_passe), 10);

    await pool.query(
      "INSERT INTO comptes (nom, email, mot_de_passe) VALUES ($1, $2, $3)",
      [String(nom).trim(), emailNormalise, hash]
    );

    return res.status(201).json({ message: "Compte cree avec succes." });
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur lors de la creation du compte." });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, mot_de_passe } = req.body;

  if (!email || !mot_de_passe) {
    return res.status(400).json({ message: "Email et mot de passe obligatoires." });
  }

  try {
    const emailNormalise = String(email).trim().toLowerCase();
    const result = await pool.query(
      "SELECT id, nom, email, mot_de_passe FROM comptes WHERE email = $1",
      [emailNormalise]
    );

    if (result.rowCount === 0) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect." });
    }

    const user = result.rows[0];
    const isValid = await bcrypt.compare(String(mot_de_passe), user.mot_de_passe);

    if (!isValid) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect." });
    }

    return res.json({
      message: "Connexion reussie.",
      user: {
        id: user.id,
        nom: user.nom,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur lors de la connexion." });
  }
});

app.listen(port, () => {
  console.log(`Serveur API demarre sur http://localhost:${port}`);
});

// if the app is built and running in production, serve static files from the frontend
if (process.env.NODE_ENV === 'production') {
  const frontendDist = path.join(__dirname, '../frontend/dist');
  app.use(express.static(frontendDist));

  // fallback to index.html for client-side routing
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
}
