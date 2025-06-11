import './RecentBooks.css';
import { useState, useEffect } from "react"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import defaultCover from "../../assets/images/capa-branca.jpg";

export default function RecentBooks({ tituloSecao }) {
  const settings = {
    accessibility: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 5
        }
      }
    ]
  };

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
    <div className='BookList-container'>
      <h3>Novidades</h3>
      <h4>Confira os livros mais novos no GBook!</h4>
      <div className='booklist-slider-container'>
        <Slider {...settings}>
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <img
                src={book.cover_url || defaultCover}
                alt={book.title}
                className="showbooks-book-cover"
              />
              <div className="overlay">
                <a 
                  href={`/livro/${book.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="details-button">Ver detalhes</button>
                </a>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
