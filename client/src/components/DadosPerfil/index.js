import { useState, useEffect } from "react";
import './DadosPerfil.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import defaultProfile from '../../assets/images/perfil-semfoto.jpg';
export default function DadosPerfil() {
  const [nome, setNome] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  // Carrega dados do usuário ao montar o componente
  useEffect(() => {
    const loadUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Erro ao carregar perfil");

        const userData = await response.json();
        setUser(userData);
        setNome(userData.name);
      } catch (error) {
        console.error(error);
        toast.error("Erro ao carregar dados do usuário");
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [navigate]);

  // Atualiza nome do usuário
  const handleUpdateName = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    if (!/^[a-zA-ZÀ-ÿ\s'-]{3,255}$/.test(nome.trim())) {
      if (nome.length > 255) {
        toast.error("Nome muito longo. Máximo 255 caracteres.");
      } else if (nome.length <= 3){
        toast.error("Nome muito curto. Mínimo de 3 caracteres")
      } else {
        toast.error("Nome inválido. Use apenas letras, espaços, hífens ou apóstrofos.");
      }
      setIsSaving(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.REACT_APP_API_URL}/profile/update-name`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name: nome }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao atualizar nome");
      }

      const updatedUser = await response.json();
      setUser(updatedUser.user);
      toast.success("Nome atualizado com sucesso!");
      setUser(prev => ({ ...prev, name: nome }));
    } catch (error) {
      toast.error(error.message);
      if (error.message.includes("Unauthorized")) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } finally {
      setIsSaving(false);
    }
  };

  // Atualiza imagem de perfil
  const handleUpdateProfileImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validações
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      toast.error("Formato inválido! Use JPEG, JPG ou PNG.");
      return;
    }

    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      toast.error("A imagem deve ter menos de 2MB!");
      return;
    }

    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('profile_image', file);

      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/update-profile-image`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.message || 'Erro ao atualizar imagem');

      toast.success('Imagem de perfil atualizada!');
      setUser(prev => ({ ...prev, profile_image_url: data.profile_image_url }));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsUploading(false);
      e.target.value = ''; // Permite selecionar o mesmo arquivo novamente
    }
  };

  // Logout
  const handleLogout = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) throw new Error('Falha ao fazer logout');

      localStorage.removeItem('token');
      toast.success("Logout realizado com sucesso!");
      navigate('/');
    } catch (error) {
      toast.error(error.message || "Houve um problema em seu logout");
      console.error('Erro no logout:', error);
    }
  };

  if (loading) {
    return <div className="loading">Carregando perfil...</div>;
  }

  if (!user) {
    return null; // Já foi redirecionado para /login pelo useEffect
  }

  return ( 
    <div className="profile-content">
      <div className="profile-container">
        <div className='top'>
          <Link to="/salvos">
            <button>Salvos</button>
           </Link>
          {user.type === 'professor' && (
            <div>
              <Link to="/addlivro">
                <button className="middle">Adicionar novo livro</button>
              </Link>
              <Link to="/postados">
                <button className="middle">Livros postados</button>
              </Link>
              <Link to="/lixeira">
                <button className="middle">Lixeira</button>
              </Link>
            </div>
          )}
          <button className="logout-btn" onClick={handleLogout}>Sair</button>
        </div>
        
        {/* Seção da foto de perfil */}
        <div className="profile-image-section">
          <div className="profile-image-container">
            <img 
              src={user.profile_image_url || defaultProfile} 
              alt="Foto de perfil" 
              className="profile-image"
            />
            <div className="profile-image-overlay">
              <label htmlFor="profile-image-input" className="upload-label">
                {isUploading ? 'Enviando...' : 'Alterar foto'}
              </label>
              <input
                id="profile-image-input"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleUpdateProfileImage}
                disabled={isUploading}
              />
            </div>
          </div>
        </div>

        <form className="form-profile" onSubmit={handleUpdateName}>
          <label>Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            maxLength={255}
            disabled={isSaving}
          />
          <button type="submit" disabled={isSaving || !nome.trim()}>
            {isSaving ? "Salvando..." : "Salvar"}
          </button>
        </form>
      </div>
    </div>
  );
}