import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    remember: false
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Veuillez saisir votre nom d'utilisateur";
    if (!formData.password) newErrors.password = "Veuillez saisir votre mot de passe";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulation d'une requête API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Stockage du token (simulé)
      localStorage.setItem('authToken', 'simulated-token');
      
      // Notification simulée
      //alert('Connexion réussie !');
      navigate('/Dashboard');
    } catch (error) {
      alert('Identifiants incorrects');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Tableau de bord</h1>
          <p>Connectez-vous pour accéder à votre espace</p>
        </div>
                
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-container">
              <span className="input-icon">👤</span>
              <input
                name="username"
                type="text"
                placeholder="Nom d'utilisateur"
                value={formData.username}
                onChange={handleChange}
                className={errors.username ? 'error' : ''}
              />
            </div>
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>
          
          <div className="form-group">
            <div className="input-container">
              <span className="input-icon">🔒</span>
              <input
                name="password"
                type="password"
                placeholder="Mot de passe"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
              />
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          
          <div className="form-options">
            <label className="remember-me">
              <input
                name="remember"
                type="checkbox"
                checked={formData.remember}
                onChange={handleChange}
              />
              <span style={{color:'black'}}>Se souvenir de moi</span>
            </label>
            
            <a href="/forgot-password" className="forgot-password">
              Mot de passe oublié ?
            </a>
          </div>
          
          <button 
            type="submit" 
            className="login-button" 
            disabled={loading}
          >
            {loading ? (
              <span className="spinner"></span>
            ) : (
              'Se connecter'
            )}
          </button>
        </form>
        
        {/* <div className="login-footer">
          <p>Pas encore de compte ? <a href="/register">Créer un compte</a></p>
        </div> */}
      </div>
    </div>
  );
};

export default LoginPage;