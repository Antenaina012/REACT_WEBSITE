import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    mot_de_passe: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.mot_de_passe);
      } else {
        await signup(formData.nom, formData.email, formData.mot_de_passe);
        setIsLogin(true);
        setFormData({ nom: '', email: '', mot_de_passe: '' });
        setError('Inscription réussie! Veuillez vous connecter.');
        setTimeout(() => setError(''), 3000);
        return;
      }
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ nom: '', email: '', mot_de_passe: '' });
    setError('');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-welcome">
          <h1>Stash Mada 🐒</h1>
          <p>Peluches malgaches artisanales</p>
          <p>Rejoignez notre communauté pour découvrir nos collections exclusives.</p>
        </div>

        <div className="login-form-section">
          <h2>{isLogin ? 'Connexion' : 'Inscription'}</h2>

          {error && (
            <div className={`message ${error.includes('réussie') ? 'success' : 'error'}`}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="nom">Nom complet</label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                  placeholder="Votre nom"
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="votre@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                name="mot_de_passe"
                value={formData.mot_de_passe}
                onChange={handleChange}
                required
                placeholder="••••••••"
                minLength="6"
              />
            </div>

            <button
              type="submit"
              className="btn btn-submit"
              disabled={loading}
            >
              {loading ? 'Chargement...' : isLogin ? 'Se connecter' : 'S\'inscrire'}
            </button>
          </form>

          <div className="login-toggle">
            <p>
              {isLogin ? 'Pas de compte? ' : 'Déjà inscrit? '}
              <button
                type="button"
                className="toggle-btn"
                onClick={toggleMode}
              >
                {isLogin ? 'Créer un compte' : 'Se connecter'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
