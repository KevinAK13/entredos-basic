import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FormattedMessage } from "react-intl"; // Importar FormattedMessage para internacionalización
import img1 from "../../assets/img/sanlucas.jpg";
import img2 from "../../assets/img/prov.png";
import img3 from "../../assets/img/lab.png";
import img5 from "../../assets/img/t13.jpg";
import img6 from "../../assets/img/dmi.png";

const LogoSlider = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const sliderRef = useRef();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  useEffect(() => {
    if (window.innerWidth > 768 && sliderRef.current) {
      const clone = sliderRef.current.cloneNode(true);
      sliderRef.current.parentNode.appendChild(clone);
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        when: "beforeChildren",
        staggerChildren: 0.25,
      },
    },
  };

  return (
    <motion.section
      className="pb-40 my-20 py-40 pt-20"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-6xl font-normal tracking-tight px-4 md:px-8 lg:px-12 text-gray-800 mb-4 lg:mb-8">
          <FormattedMessage id="logoSlider.title" defaultMessage="Nuestras Alianzas" />
        </h1>
        <p className="text-gray-600 font-light lg:text-lg"></p>
        <h2 className="text-lg lg:text-2xl font-light text-gray-900 tracking-normal mb-2">
          <FormattedMessage
            id="logoSlider.subtitle"
            defaultMessage="Asimismo, siendo amantes de la calidad, la construcción y la arquitectura, nos apasiona poder ofrecer los mejores productos, con el más alto nivel de diseño, materiales y distribuciones en alianza con diferentes firmas de renombre."
          />
        </h2>
      </div>
      <div className="logos overflow-hidden bg-white relative whitespace-nowrap py-8">
        <motion.div ref={sliderRef} className="logos-slide inline-block animate-slide">
          <img
            src={img1}
            className="h-16 mx-8 opacity-75 hover:opacity-100 transition-opacity duration-300"
            alt="San Lucas"
          />
          <img
            src={img2}
            className="h-16 mx-8 opacity-75 hover:opacity-100 transition-opacity duration-300"
            alt="Providencia"
          />
          <img
            src={img3}
            className="h-16 mx-8 opacity-75 hover:opacity-100 transition-opacity duration-300"
            alt="Lab Arq"
          />
          <img
            src={img5}
            className="h-16 mx-8 opacity-75 hover:opacity-100 transition-opacity duration-300"
            alt="Torre 13"
          />
          <img
            src={img6}
            className="h-16 mx-8 opacity-75 hover:opacity-100 transition-opacity duration-300"
            alt="DMI"
          />
        </motion.div>
      </div>
      <style jsx>{`
        @keyframes slide {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }

        .logos:hover .logos-slide {
          animation-play-state: paused;
        }

        .logos-slide {
          display: inline-flex;
          animation: slide 30s linear infinite;
        }

        @media (max-width: 768px) {
          .logos-slide {
            animation: slide 45s linear infinite;
          }
        }

        @media (max-width: 480px) {
          .logos-slide {
            animation: slide 60s linear infinite;
          }
        }
      `}</style>
    </motion.section>
  );
};

export default LogoSlider;
