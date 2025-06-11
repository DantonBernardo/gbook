import "../Erro/Erro.css"; 
import { useNavigate } from "react-router-dom";
import error404 from "../../assets/images/error404.png";

export default function Erro (){
  const navigate = useNavigate()

  async function handleRedirect(){
    navigate("/home")
  }

  return (
    <div className="error">
      <div className="error-container">
        <img
          src={error404} 
          alt="Error 404" 
        />
        <button onClick={handleRedirect}>
          Voltar para página inicial
        </button>
      </div>
    </div>
  );
}