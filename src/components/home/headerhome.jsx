import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import img1 from "../../assets/img/property/22/4.jpg";
import img2 from "../../assets/img/property/2/3.jpg";
import img3 from "../../assets/img/property/5/1.jpg";
import { useIntl } from "react-intl";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
  {
    src: img1,
    nameId: "header.image1.name",
  },
  {
    src: img2,
    nameId: "header.image2.name",
  },
  {
    src: img3,
    nameId: "header.image2.name",
  },
];

const revealVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.09,
    },
  }),
};

const Header = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const intl = useIntl();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: false,
    beforeChange: (_, next) => setCurrentSlide(next),
  };

  const handlePrevious = () => {
    sliderRef.current.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  return (
    <div className="relative overflow-hidden">
      <Slider {...settings} className="h-screen" ref={sliderRef}>
        {images.map((image, idx) => {
          const name = intl.formatMessage({ id: image.nameId });
          return (
            <div key={idx} className="h-screen relative">
              <motion.div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${image.src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to top, rgba(255, 255, 255, 1) 1%, rgba(255, 255, 255, 0.2) 15%, rgba(0, 0, 0, 0.0) 40%, rgba(0, 0, 0, 0.3) 100%)`,
                }}
              ></div>
              {/* Título mejorado y centrado */}
<div className="absolute top-[20%] left-[5%] md:left-[8%] lg:left-[10%] flex items-start text-left text-white">
  <motion.p
    initial="hidden"
    animate="visible"
    key={currentSlide}
    className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl quarter-font tracking-wider font-normal uppercase mb-4"
    style={{
      maxWidth: "80%",
      lineHeight: "1.2",
      textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
    }}
  >
    {name.split("").map((letter, i) => (
      <motion.span key={i} custom={i} variants={revealVariants}>
        {letter}
      </motion.span>
    ))}
  </motion.p>
</div>

            </div>
          );
        })}
      </Slider>
      {/* Botones de navegación */}
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
        <button
          className="text-white lg:text-4xl text-xl font-light hover:scale-105 transition-all ease-in-out px-4 py-2 rounded"
          onClick={handlePrevious}
        >
          <SlArrowLeft />
        </button>
      </div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
        <button
          className="text-white lg:text-4xl text-xl font-extralight hover:scale-105 transition-all ease-in-out px-4 py-2 rounded"
          onClick={handleNext}
        >
          <SlArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Header;
