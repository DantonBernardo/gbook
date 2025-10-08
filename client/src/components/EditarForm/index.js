import "./style.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditarForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: "",
    description: "",
    pdf_url: "",
    cover: "", // URL da imagem atual (caso já tenha)
  });
  const [newCoverFile, setNewCoverFile] = useState(null); // arquivo novo, se for trocado
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${process.env.REACT_APP_API_URL}/books/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar livro");
        }

        const data = await response.json();
        setBook(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    if (e.target.name === "title" && e.target.value.length > 100) return;
    if (e.target.name === "description" && e.target.value.length > 400) return;
    if (e.target.name === "pdf_url" && e.target.value.length > 400) return;
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setNewCoverFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", book.title);
      formData.append("description", book.description);
      formData.append("pdf_url", book.pdf_url);
      if (newCoverFile) {
        formData.append("cover", newCoverFile);
      }
      
      const response = await fetch(`${process.env.REACT_APP_API_URL}/books/${id}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });
      // const result = await response.json();
      
      if (!response.ok) {
        toast.error('Por favor, confira os dados digitados.');
        return;
      }

      toast.success("Livro atualizado com sucesso!");
      navigate("/postados");

    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="editar-form-container">
      <h2>Editar Livro</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Título</label>
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Descrição</label>
          <textarea
            name="description"
            value={book.description}
            onChange={handleChange}
            maxLength={400}
            required
          />
        </div>

        <div>
          <label>PDF (URL)</label>
          <input
            type="url"
            name="pdf_url"
            value={book.pdf_url}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Imagem de capa</label>
          <input
            type="file"
            name="cover"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}
