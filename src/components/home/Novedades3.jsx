import React, { useState } from "react";
import img1 from "../../assets/img/inm2.jpg";
import img2 from "../../assets/img/inm5.jpg";
import img3 from "../../assets/img/t2.jpg";
import img4 from "../../assets/img/inm20.jpg";
import { FormattedMessage } from "react-intl";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    title: (
      <FormattedMessage id="services.1" defaultMessage="Venta de Propiedades" />
    ),
    description: (
      <FormattedMessage
        id="services.01"
        defaultMessage="Encuentra la propiedad de tus sueños en nuestro amplio catálogo de propiedades."
      />
    ),
    imageUrl: img1,
  },
  {
    title: (
      <FormattedMessage
        id="services.2"
        defaultMessage="Proyectos de Construcción"
      />
    ),
    description: (
      <FormattedMessage
        id="services.02"
        defaultMessage="Diseñamos y ejecutamos proyectos de construcción personalizados asegurando calidad en tu propiedad."
      />
    ),
    imageUrl: img2,
  },
  {
    title: (
      <FormattedMessage
        id="services.3"
        defaultMessage="Asesoría Inmobiliaria"
      />
    ),
    description: (
      <FormattedMessage
        id="services.03"
        defaultMessage="Recibe orientación experta en inversión inmobiliaria para mejorar el rendimiento de tus inversiones."
      />
    ),
    imageUrl: img3,
  },
  {
    title: (
      <FormattedMessage id="services.4" defaultMessage="Trámite Hipotecario" />
    ),
    description: (
      <FormattedMessage
        id="services.04"
        defaultMessage="Aprovecha nuestra asesoría para hacer más sencillo el proceso de obtención de tu propiedad."
      />
    ),
    imageUrl: img4,
  },
];

const Services = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className=" mx-full ">
      <div className="text-center mb-12">
        <h2 className="text-5xl lg:text-7xl font-normal text-gray-900">
          <FormattedMessage
            id="services.tite"
            defaultMessage="Nuestros Servicios"
          />
        </h2> 
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {services.map((service, index) => (
          <div
            key={index}
            className="block cursor-pointer"
            onClick={() => handleToggle(index)}
          >
            <img
              alt={service.title.props.defaultMessage}
              src={service.imageUrl}
              className="h-64 w-full object-cover sm:h-80 lg:h-96"
            />
            <h3 className="mt-4 text-lg font-medium text-gray-900 uppercase text-center lg:text-xl">
              {service.title}
            </h3>
            <div className="flex justify-center mt-2">
              {expandedIndex === index ? (
                <SlArrowUp className="text-gray-900" />
              ) : (
                <SlArrowDown className="text-gray-900" />
              )}
            </div>
            <AnimatePresence>
              {expandedIndex === index && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ ease: "easeInOut", duration: 0.3 }}
                  className="mt-2 text-gray-900 text-base font-light text-center"
                >
                  {service.description}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
