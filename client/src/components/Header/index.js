import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../Header/Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../assets/images/logo-gbook.png';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [livrosFiltrados, setLivrosFiltrados] = useState([]);

  // 1. Buscar livros só uma vez
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
}, []); // Só roda ao montar

// 2. Filtrar sempre que books OU searchQuery mudar
useEffect(() => {
  if (books.length > 0) {
    const filtrados = books.filter(book =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setLivrosFiltrados(filtrados);
  } else {
    setLivrosFiltrados([]); // Evita lixo antigo
  }
}, [books, searchQuery]);
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/Procurar/${searchQuery}`);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Determina qual link deve ter a classe 'pagina-atual' com base na URL atual
  const getLinkClass = (path) => {
    return location.pathname === path ? 'nav-link pagina-atual' : 'nav-link';
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-custom">
        <div className="container-fluid">
          <div className="logo">
            <Link className="navbar-brand" to="/home">
              <img id="logoImage" src={logo} alt="logo-gbook" />
            </Link>
          </div>
          <button className="navbar-toggler" type="button" onClick={toggleMenu} aria-controls="navbarSupportedContent" aria-expanded={isOpen} aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={getLinkClass('/Home')} to="/home">Início</Link>
              </li>
              {/* <li className="nav-item">
                <Link className={getLinkClass('/Disciplinas')} to="/disciplinas">Disciplinas</Link>
              </li> */}
              <li className="nav-item">
                <Link className={getLinkClass('/Biblioteca')} to="/biblioteca">Biblioteca</Link>
              </li>
              <li className="nav-item">
                <Link className={getLinkClass('/Perfil')} to="/perfil">Perfil</Link>
              </li>
            </ul>
            <div style={{ position: 'relative' }}>
              <form className="d-flex" onSubmit={handleSearch}>
                <input 
                  className="form-control me-2 form-control-lg" 
                  type="search" 
                  placeholder="Pesquisar livro"
                  aria-label="Search" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  id="barra-de-busca"
                />
                {/* <button className="btn btn-outline-success cor-barra-busca" type="submit">Buscar</button> */}
              </form>

              {searchQuery && (
                <ul className="dropdown-livros" id="dropdown-livros">
                  {livrosFiltrados.length > 0 ? (
                    livrosFiltrados.map((livro) => (
                      <a
                      href={`/livro/${livro.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dropdown-link"
                      >
                        <li key={livro.id}>
                          {livro.title}
                        </li>
                      </a>
                    ))
                  ) : (
                    <li className="sem-livros">Nenhum livro encontrado</li>
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}