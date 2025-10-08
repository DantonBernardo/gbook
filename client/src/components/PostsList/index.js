import { useState, useEffect } from "react";
import "./style.css";
import defaultCover from "../../assets/images/capa-branca.jpg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Postados() {
  const [books, setBooks] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.REACT_APP_API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const user = await response.json();
        setUserId(user.id);
      } else {
        console.error("Erro ao buscar usuário");
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${process.env.REACT_APP_API_URL}/books`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar livros");
        }

        const data = await response.json();
        const livrosDoUsuario = data.filter((book) => book.user_id === userId);
        setBooks(livrosDoUsuario);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBooks();
  }, [userId]);



  const handleRedirect = (id) => {
    navigate(`/editar/${id}`);
  };

  const handleTrash = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.REACT_APP_API_URL}/books/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
      } else {
        toast.error("Erro ao excluir o livro");
      }
      toast.success("Livro movido para a lixeira!")
    } catch (error) {
      toast.error("Erro na requisição:", error);
    }
  };

  return (
    <div className="postados-container">
        {books.length > 0 ? (
          <div>
            <div className="postados-top">
              <h2>Livros postados</h2>
              <Link to="/lixeira">Lixeira</Link>
            </div>
            <ul>
              {books.map((book) => (
                <li key={book.id}>
                  <img
                    src={book.cover_url || defaultCover}
                    alt={book.title}
                  />
                  <p>{book.title}</p>
                  <div>
                    <button className="link-button" onClick={() => handleRedirect(book.id)}>Alterar</button>
                    <button className="link-button" onClick={() => handleTrash(book.id)} id="delete">Excluir</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Você ainda não postou nenhum livro.</p>
        )}
    </div>
  );
}
