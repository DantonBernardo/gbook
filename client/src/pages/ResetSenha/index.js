import { useState } from "react";
import './ResetSenha.css';

import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from 'react-toastify';

import GBLogo from '../../assets/images/login/LogoMin.png';

export default function ResetSenha({ onBack }) {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function resetSubmit(event) {
    event.preventDefault();
    setLoading(true);

    const auth = getAuth();

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Email de redefinição de senha enviado com sucesso!");
        setSuccess(true);
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          toast.error("Email não encontrado!");
        } else {
          toast.error("Ocorreu um erro, tente novamente mais tarde.");
        }
      })
      .finally(() => {
        setTimeout(() => setLoading(false), 3000);
      });
  }

  return (
    <div className="ResetContainer">
      <div className="ResetForm">
        <img src={GBLogo} alt="Logo minimalista GBook" />
        <h1>Vou te ajudar!</h1>
        <h3>Insira seu email para receber um<br />código e recuperar sua senha</h3>

        <form onSubmit={resetSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Enviar código"}
          </button>

          {/* botão de voltar visível SEMPRE */}
          <button
            type="button"
            onClick={onBack}
            className="text-blue-500 underline bg-transparent border-none mt-4 cursor-pointer"
          >
            Voltar para página de Login
          </button>

          {/* Se quiser manter também o link extra após sucesso */}
          {success && (
            <div className="mt-2 text-green-700 text-sm">Verifique seu email para redefinir a senha.</div>
          )}
        </form>
      </div>
    </div>
  );
}
