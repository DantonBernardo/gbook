import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import './Login.css';

import GBLogo from '../../assets/images/login/LogoMin.png';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log('Login bem-sucedido:', data);

      localStorage.setItem('token', data.access_token);

      toast.success("Login realizado com sucesso!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setLoading(false);
      navigate('/home');
    } catch (error) {
      setLoading(false);
      toast.error("Credenciais incorretas!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <div className="loginContainer">
      <div className="loginForm">
        <img src={GBLogo} alt="Logo minimalista GBook" />
        <h1>Bem vindo de volta!</h1>
        <h3>Por favor, insira seus dados</h3>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            {loading ? "Carregando..." : "Acessar"}
          </button>
        </form>
      </div>
    </div>
  );
}
