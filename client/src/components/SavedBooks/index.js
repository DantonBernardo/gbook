import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import './SavedBooks.css';

export default function SavedBooks() {
  const [savedBooks, setSavedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedIds, setSavedIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('savedBooks') || []);
    } catch (error) {
      console.error("Erro ao ler savedBooks do localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('Você precisa estar logado!');
        }

        const response = await fetch(`${process.env.REACT_APP_API_URL}/books`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error('Erro ao buscar livros');
        }
        
        const data = await response.json();
        
        const filteredBooks = data.filter(book => savedIds.includes(book.id));
        setSavedBooks(filteredBooks);
        
      } catch (error) {
        toast.error("Ocorreu um erro inesperado");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [savedIds]);

  const handleDeleteBook = (bookId) => {    
    try {
      const updatedIds = savedIds.filter(id => id !== bookId);
      
      localStorage.setItem('savedBooks', JSON.stringify(updatedIds));
      
      setSavedIds(updatedIds);
      
      setSavedBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
      
      toast.success('Livro removido da sua lista!');
    } catch (error) {
      toast.error('Erro ao remover livro');
      console.error(error);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="SavedBooks-container">
      <h2 className="SavedBooks-title">Livros para Ler Mais Tarde</h2>
      
      {savedBooks.length === 0 ? (
        <p>Nenhum livro salvo.</p>
      ) : (
        <div className="SavedBooks-grid">
          {savedBooks.map((book) => (
            <div key={book.id} className="SavedBooks-item">
              <div className="SavedBooks-details">
                <h3 className="SavedBooks-name">{book.title}</h3>
                <a 
                  href={book.pdf_url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="SavedBooks-link"
                >
                  Acessar Livro
                </a>
              </div>
              <button 
                className="delete-book" 
                onClick={() => handleDeleteBook(book.id)}
              >
                Remover da lista
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}