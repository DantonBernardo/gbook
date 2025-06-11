import { useState, useEffect } from "react";
import "./style.css";
import defaultCover from "../../assets/images/capa-branca.jpg";
import { toast } from "react-toastify";

export default function TrashList() {
  const [trashedBooks, setTrashedBooks] = useState([]);

  useEffect(() => {
    const fetchTrashedBooks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${process.env.REACT_APP_API_URL}/books/trashed`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar livros da lixeira");
        }

        const data = await response.json();
        setTrashedBooks(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTrashedBooks();
  }, []);

  const handleRestore = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.REACT_APP_API_URL}/books/${id}/restore`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setTrashedBooks((prev) => prev.filter((book) => book.id !== id));
      } else {
        console.error("Erro ao restaurar o livro.");
      }
      toast.success("Livro restaurado com sucesso!");
    } catch (error) {
      toast.error("Ocorreu um erro inesperado!");
    }
  };

  const handleForceDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.REACT_APP_API_URL}/books/${id}/force`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Remove o livro da lista da lixeira
        setTrashedBooks((prev) => prev.filter((book) => book.id !== id));
        toast.warning("Livro excluido permanentemente.")
      } else {
        toast.error("Erro ao excluir permanentemente o livro.");
      }
    } catch (error) {
      console.error("Erro na requisição de exclusão permanente:", error);
    }
  };

  return (
    <div className="trashlist-container">
      <h2>Livros na Lixeira</h2>
      {trashedBooks.length > 0 ? (
        <ul>
          {trashedBooks.map((book) => (
            <li key={book.id}>
              <img
                src={book.cover_url || defaultCover}
                alt={book.title}
              />
              <p>{book.title}</p>
              <div className="trash-buttons">
                <button className="restore-button" onClick={() => handleRestore(book.id)}>Restaurar</button>
                <button className="delete-button" onClick={() => handleForceDelete(book.id)}>Excluir permanentemente</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum livro na lixeira.</p>
      )}
    </div>
  );
}