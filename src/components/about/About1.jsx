import React from "react";
import { motion } from "framer-motion";
import { useIntl, FormattedMessage } from "react-intl"; // Uso de hooks y componentes de react-intl

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Configuración de la animación letra por letra
const letterAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const About1 = () => {
  const intl = useIntl(); // Hook para acceder a intl

  // Obtener el texto de introducción utilizando intl.formatMessage
  const introductionText = intl.formatMessage({
    id: "entreDos.introduction",
    defaultMessage:
      "Entre Dos nace a raíz de nuestra experiencia personal - nos encontramos cara a cara con la falta de una inmobiliaria que pusiera al cliente, con sus gustos y necesidades, como absoluta prioridad. Que brindara un servicio fluido, eficiente y a la medida; enfocado en solucionar la búsqueda de la propiedad ideal de cada cliente.",
  });

  return (
    <section className="max-h-screen py-12 md:py-40 mx-auto pt-20 bg-white px-4 sm:px-6 lg:px-8">
      <div className="mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8 }}
          variants={fadeInUp}
          className="py-16"
        >
          <div className="text-start px-2 md:px-12 space-y-8">
            {/* Encabezado Principal */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal tracking-tight text-gray-800 mb-6">
              <FormattedMessage
                id="entreDos.title"
                defaultMessage='"Un servicio fluido, eficiente y a la medida"'
              />
            </h1>

            {/* Descripción Introductoria con efecto de letra por letra */}
            <p className="font-light text-gray-700 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-justify">
              {introductionText.split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.03 }}
                  variants={letterAnimation}
                >
                  {char}
                </motion.span>
              ))}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About1;
