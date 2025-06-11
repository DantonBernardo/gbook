import "./ShowBooks.css";
import { useEffect, useState } from "react";
import defaultCover from "../../assets/images/capa-branca.jpg";

export default function ShowBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${process.env.REACT_APP_API_URL}/books`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar livros");
        }

        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="showbooks">
      <h1 className="showbooks-title">Biblioteca geral</h1>
      <div className="showbooks-content">
        {books.length > 0 ? (
          <ul>
            {books.map((book) => (
              <li key={book.id} className="showbooks-book">
                <a 
                  href={`/livro/${book.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="showbooks-book-a"
                >
                  <img
                    src={book.cover_url || defaultCover}
                    alt={book.title}
                    className="showbooks-book-cover"
                  />
                </a>
                <p className="showbooks-book-title">{book.title}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum livro encontrado.</p>
        )}
      </div>
    </div>
  );
}