import React from "react";
import { motion } from "framer-motion";
import { FormattedMessage } from "react-intl"; // Importación de FormattedMessage
import img2 from "../../assets/img/inm2.jpg";
import img1 from "../../assets/img/inmo3.jpg";
import img3 from "../../assets/img/con9.jpg";
import img4 from "../../assets/img/inmo1.jpg";

const services = [
  {
    src: img1,
    alt: "Imagen de asesoría inmobiliaria",
    title: "services.title1",
    description: "services.description1",
  },
  {
    src: img2,
    alt: "Imagen de comercialización inmobiliaria",
    title: "services.title2",
    description: "services.description2",
  },
  {
    src: img3,
    alt: "Imagen de proyectos de construcción",
    title: "services.title3",
    description: "services.description3",
  },
  {
    src: img4,
    alt: "Imagen de trámites y financiamientos",
    title: "services.title4",
    description: "services.description4",
  },
];

const ServicesHome = () => {
  return (
    <div className="relative py-24 overflow-x-hidden">
      <h1 className="text-left py-12 px-4 md:px-8 lg:px-12 text-4xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal tracking-tight text-gray-800">
        <FormattedMessage id="services.heading" defaultMessage="Nuestros Servicios" />
      </h1>

      <div className="flex space-x-4 lg:space-x-8 px-2 lg:px-12 w-full overflow-x-auto snap-x snap-mandatory">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="relative flex-none w-5/6 md:w-2/5 lg:w-2/5 xl:w-2/5 snap-center overflow-hidden rounded-lg shadow-lg transition-transform duration-500"
          >
            <div className="relative group">
              {/* Contenedor de imagen con gradiente */}
              <div className="relative">
                <img
                  src={service.src}
                  alt={service.alt}
                  className="w-full h-80 md:h-80 lg:h-96 xl:h-[600px] object-cover transition-transform duration-500 ease-in-out"
                />
                {/* Gradiente sobre la imagen */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent pointer-events-none"></div>
              </div>
              {/* Efecto de sombra opaca al hacer hover */}
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {/* Título siempre visible */}
              <div className="absolute top-4 left-4 p-4 z-10">
                <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-normal">
                  <FormattedMessage id={service.title} />
                </h2>
              </div>
              {/* Descripción que se revela al hacer hover */}
              <div className="absolute top-12 lg:top-15 left-4 p-4 z-10 mt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-lg md:text-xl lg:text-xl font-light text-left">
                  <FormattedMessage id={service.description} />
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ServicesHome;
