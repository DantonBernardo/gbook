import '../HomeCarrossel/HomeCarrossel.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default function HomeCarrossel(props) {
  return (
    <div>
      <div id="carrossel">
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">

          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>

          <div className="carousel-inner">
            <div className="carousel-item active">
              <img 
                alt={props.alt1} 
                src={props.slide1} 
                id="primeiroSlide" className="d-block img-fluid carousel-img" 
              />
            </div>

            <div className="carousel-item">
              <img 
                src={props.slide2} 
                alt={props.alt2} 
                id="segundoSlide" 
                className="d-block img-fluid carousel-img" 
              />
            </div>

            <div className="carousel-item">
              <img 
                src={props.slide3} 
                alt={props.alt3} 
                id="terceiroSlide" 
                className="d-block img-fluid carousel-img" 
              />
            </div>
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Anterior</span>
          </button>

          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Próximo</span>
          </button>
        </div>
      </div>
    </div>
  )
}