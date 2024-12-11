import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../src/services/api'; // Importar o axiosInstance
import './css/login.css';
import './css/home.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await api.post<{ token: string }>('/user/login', { email, password });

      // Salvar o token no localStorage
      localStorage.setItem('token', response.data.token);

      // Redirecionar para a página principal
      navigate('/home');
    } catch (err) {
      setError('Email ou senha incorretos. Tente novamente.');
    }
  };

  return (
    <div className="app-container">
      <h2>Login</h2>
      <form className="cardLogin" onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="senha">Senha:</label>
        <input
          type="password"
          id="senha"
          name="senha"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;