import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./CarouselEffect.css";
import { images } from "../CarouselEffect/data";
function CarouselEffect() {
  return (
    <>
      <div className="carousel-wraper">
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
        >
          {images?.map((item, index) => {
            return (
              <div className="img-wraper" key={index}>
                <img src={item} alt="" />
              </div>
            );
          })}
        </Carousel>
        <div className="fade-carousel text-dark"></div>
      </div>
    </>
  );
}

export default CarouselEffect;
