import { useEffect, useState } from "react";
import './BookInfo.css';
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import noImgBook from '../../assets/images/capa-branca.jpg';

export default function BookInfo() {
  const { id } = useParams();
  const [book, setBook] = useState([]);

  const handleAddToReadLater = () => {
    // Pega a lista atual do localStorage ou cria array vazio
    const savedBooks = JSON.parse(localStorage.getItem('savedBooks')) || [];
    
    // Verifica se o livro já está salvo
    if (savedBooks.includes(book.id)) {
      toast.warning('Este livro já está na sua lista!');
      return;
    }
    
    // Adiciona o novo livro
    savedBooks.push(book.id);
    
    // Salva no localStorage
    localStorage.setItem('savedBooks', JSON.stringify(savedBooks));
    
    toast.success('Livro salvo para ler depois!');
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${process.env.REACT_APP_API_URL}/books/${id}`, {
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
        setBook(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBook();
  }, [id]);

  if (!book) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="livro">
      <div className="container">
        <div className="row">
          <div className="col-md-6 book-cover">
            <img
              src={noImgBook} 
              alt={`Capa do livro ${book.title}`}
              className="img-fluid"
            />
            
          </div>
          <div className="col-md-6 book-info">
            <div className="title-and-back">
              <h2>{book.title}</h2>
                {book.user ? (
                  <h3>Postado por {book.user.name}</h3>
                ) : null}
            </div>
            <p>{book.description}</p>
            <div className="button-container">
              <a href={book.pdf_url} target="_blank" rel="noreferrer" className="btn btn-primary btn-color btn-left">Acessar Livro</a>
              <button onClick={handleAddToReadLater} className="btn btn-primary btn-color btn-right">Ler mais tarde</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
