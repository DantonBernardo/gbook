import Header from '../../components/Header';
import Footer from '../../components/Footer';
import HomeCarrossel from '../../components/HomeCarrossel';
import RecentBooks from '../../components/RecentBooks';

import slide1 from '../../assets/images/carousel/primeiro_slide.png';
import slide2 from '../../assets/images/carousel/segundo_slide.png';
import slide3 from '../../assets/images/carousel/terceiro.png';

export default function Home() {



  return (
    <div>
      <Header />
      <HomeCarrossel 
        slide1={slide1}
        alt1={'Slide 1'}
        slide2={slide2}
        alt2={'Slide 2'}
        slide3={slide3}
        alt3={'Slide 3'}
      />
      <RecentBooks />
      <Footer />
    </div>
  );
};