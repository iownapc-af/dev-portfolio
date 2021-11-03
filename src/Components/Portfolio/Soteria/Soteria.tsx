import { CarouselProvider, Dot, Slide, Slider } from 'pure-react-carousel';
import Tilt from 'react-parallax-tilt';
import '../carousel.scss';
import 'pure-react-carousel/dist/react-carousel.es.css';
import Soteria_idf_dark from '../../../res/soteria/idf-incident-list-dark.png';
import Soteria_idf_light from '../../../res/soteria/idf-incident-list-light.png';
import Soteria_create_dark from '../../../res/soteria/create-new-incident-dark.png';
import Soteria_create_light from '../../../res/soteria/create-new-incident-light.png';
import Soteria_role_management_dark from '../../../res/soteria/user-roles-dark.png';
import Soteria_role_management_light from '../../../res/soteria/user-roles-light.png';
import Soteria_edit_incident_dark from '../../../res/soteria/edit-incident-dark.png';
import Soteria_edit_incident_light from '../../../res/soteria/edit-incident-light.png';

const images = [
  Soteria_idf_dark,
  Soteria_idf_light,
  Soteria_create_dark,
  Soteria_create_light,
  Soteria_role_management_dark,
  Soteria_role_management_light,
  Soteria_edit_incident_dark,
  Soteria_edit_incident_light,
];

const Soteria = () => {
  const renderSlides = () => {
    return images.map((image, index) => {
      return (
        <Slide index={index} key={`slide ${index.toString()}`}>
          <div className="slide--contents">
            <img src={image} alt="" />
          </div>
        </Slide>
      );
    });
  };

  const renderDots = () => {
    return images.map((image, index) => {
      return (
        <Dot slide={index} key={`slide ${index.toString()}`}>
          <Tilt
            className="Tilt"
            tiltReverse={true}
            perspective={700}
            glareEnable={true}
            glareMaxOpacity={0}
          >
            <div className="dot-image-wrapper">
              <img src={image} alt="" />
            </div>
          </Tilt>
        </Dot>
      );
    });
  };

  return (
    <>
      <div className="Carousel-wrapper">
        <CarouselProvider
          visibleSlides={1}
          totalSlides={8}
          naturalSlideWidth={1220}
          naturalSlideHeight={690}
          dragEnabled={false}
        >
          <Slider>{renderSlides()}</Slider>
          <div className="dot">{renderDots()}</div>
        </CarouselProvider>
      </div>
      <div className="project-desc">Typyscripty</div>
    </>
  );
};

export default Soteria;
