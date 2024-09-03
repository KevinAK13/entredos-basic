import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FiMapPin } from "react-icons/fi";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import properties from "../../components/plans/Data";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const Carousel = () => {
  const sliderRef = useRef(null);

  // Define los IDs de las propiedades destacadas
  const featuredPropertyIds = [105, 122, 102, 104, 108, 112]; // Reemplaza con los IDs de las propiedades destacadas

  // Filtra las propiedades destacadas usando los IDs
  const featuredProperties = properties.filter((property) =>
    featuredPropertyIds.includes(property.id)
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    draggable: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          autoplaySpeed: 2000,
        },
      },
      {
        breakpoint: 768,
        settings: {
          autoplaySpeed: 3000,
          slidesToShow: 1,
        },
      },
    ],
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const handlePrevious = () => {
    sliderRef.current.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  return (
    <section className="w-full py-16 lg:py-32 relative">
      <div className="max-w-full mx-auto px-4 lg:px-20">
        <header className="mb-12 text-left">
          <h2 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal tracking-tight text-left text-gray-800 mb-0 lg:mb-16">
            <FormattedMessage id="carousel.featured" defaultMessage="Featured Properties" />
          </h2>
        </header>

        <Slider {...settings} ref={sliderRef}>
          {featuredProperties.map((property) => (
            <article key={property.id} className="px-2">
              <div className="rounded-lg shadow-lg overflow-hidden h-full transition-all ease-in-out transform hover:scale-105 duration-300">
                <div className="relative">
                  <img
                    className="w-full h-[350px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px] object-cover"
                    src={property.image}
                    alt={property.title.props.defaultMessage} // Use defaultMessage directly
                  />
                  <Link to={`/properties/${property.id}`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4 transition-all ease-in-out">
                      <div className="text-white text-sm font-light">
                        <div className="flex items-center mb-2">
                          <FiMapPin className="mr-2" aria-hidden="true" />
                          <p className="text-base">
                            {property.location.municipality}, {property.location.state}
                          </p>
                        </div>
                        <h3 className="text-lg md:text-xl lg:text-2xl font-light">
                          {property.title.props.defaultMessage}
                        </h3>
                        <h4 className="text-base font-light uppercase">
                          {formatPrice(property.price)} MXN
                        </h4>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </Slider>

        <footer className="mt-8 text-center">
          <p className="text-xs font-light text-gray-600 uppercase tracking-wide">
            <FormattedMessage
              id="carousel.adprice"
              defaultMessage="Advertised prices may change without notice."
            />
          </p>
        </footer>
      </div>

      {/* Flechas para la navegación */}
      <div className="absolute hidden lg:flex top-1/2 left-2 sm:left-4 transform -translate-y-1/2 z-10">
        <button
          className="text-gray-800 text-2xl sm:text-4xl font-light hover:scale-105 transition-all ease-in-out"
          onClick={handlePrevious}
        >
          <SlArrowLeft />
        </button>
      </div>
      <div className="absolute hidden lg:flex top-1/2 right-2 sm:right-4 transform -translate-y-1/2 z-10">
        <button
          className="text-gray-800 text-2xl sm:text-4xl font-light hover:scale-105 transition-all ease-in-out"
          onClick={handleNext}
        >
          <SlArrowRight />
        </button>
      </div>
    </section>
  );
};

export default Carousel;
