import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./FormBook.css";

export default function FormBook() {
  const [userType, setUserType] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    pdf_url: "",
    cover: null
  });
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoadingUser(false);
        return;
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error("Não autorizado");

        const user = await response.json();
        setUserType(user.type);
      } catch (err) {
        console.error("Erro ao buscar usuário:", err);
        toast.error("Erro ao verificar permissão do usuário.");
      } finally {
        setLoadingUser(false);
      }
    }

    fetchUser();
  }, []);

  useEffect(() => {
    if (userType && userType !== 'professor') {
      toast.error("Apenas professores podem adicionar livros.");
      setLoading(false);
    }
  }, [userType]);

  if (loadingUser) {
    return <div>Carregando...</div>;
  }

  if (userType !== 'professor') {
    return <div className="form-container">Acesso restrito a professores.</div>;
  }

  // Manipuladores de estado unificados
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validação do tipo de arquivo
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      toast.error("Formato inválido! Use JPEG, JPG ou PNG.");
      return;
    }

    // Validação do tamanho
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      toast.error("A imagem deve ter menos de 2MB!");
      return;
    }

    // Criar preview da imagem
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    setFormData(prev => ({ ...prev, cover: file }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  console.log("Iniciando envio...", formData);

  try {
    // Validação de URL
    if (!formData.pdf_url) {
      throw new Error("URL do PDF é obrigatória!");
    }

    try {
      new URL(formData.pdf_url);
    } catch (err) {
      throw new Error("Por favor, insira uma URL válida!");
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("pdf_url", formData.pdf_url);
    
    if (formData.cover) {
      console.log("Adicionando cover ao FormData:", formData.cover);
      data.append("cover", formData.cover);
    }

    console.log("FormData contents:");
    for (let [key, value] of data.entries()) {
      console.log(key, value);
    }

    const token = localStorage.getItem("token");

    const response = await fetch(`${process.env.REACT_APP_API_URL}/books`, {
      method: "POST",
      body: data,
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    console.log("Resposta recebida:", response);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Erro detalhado:", errorData);
      throw new Error(errorData.message || `Erro ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Sucesso:", result);

    toast.success("Livro adicionado com sucesso!");
    
    // Reset
    setFormData({
      title: "",
      description: "",
      pdf_url: "",
      cover: null
    });
    setPreview(null);
    
  } catch (error) {
    console.error("Erro completo:", error);
    toast.error(error.message || "Houve um erro! Tente novamente.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="add-livro-form" encType="multipart/form-data">
        <label>Nome do Livro:*</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          maxlength="255"
        />

        <label>Descrição:*</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          maxlength="400"
        />

        <label>URL do PDF:*</label>
        <input
          type="url"
          name="pdf_url"
          value={formData.pdf_url}
          onChange={handleChange}
          placeholder="https://linkdopdf.com"
          required
        />

        <label>Imagem da capa:</label>
        <input
          type="file"
          name="cover"
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleFileChange}
        />
        
        {/* Preview da imagem */}
        {preview && (
          <div className="image-preview">
            <img src={preview} alt="Preview da capa" style={{ maxWidth: '200px', maxHeight: '300px' }} />
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Adicionando..." : "Adicionar Livro"}
        </button>
      </form>
    </div>
  );
}