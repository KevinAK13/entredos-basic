import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { FormattedMessage } from "react-intl";

const Features = () => {
  const controls = useAnimation();
  const ref = useRef(null);

  // Configuración de animación para entrada elegante
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Retraso entre elementos hijos
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 40,
        damping: 20,
        duration: 0.8,
      },
    },
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            controls.start("visible");
          } else {
            controls.start("hidden");
          }
        });
      },
      {
        threshold: 0.1, // Inicia la animación cuando el 10% del componente está en vista
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [controls]);

  return (
    <section
      className="py-8 lg:py-16"
      aria-label="Features Section - Quality Construction, Sustainable Design, and Customer Satisfaction"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row">
        {/* Left Section - Additional Content or Image */}
        <div className="lg:w-1/2 flex items-center justify-center bg-white">
          <motion.div
            initial="hidden"
            animate={controls}
            variants={item}
            className="text-gray-800 py-2"
            aria-label="Supporting Image or Content"
          >
            {/* Placeholder for potential content */}
          </motion.div>
        </div>

        {/* Right Section - Three Key Features */}
        <div className="lg:w-1/2 flex flex-col justify-center bg-white p-4 sm:p-8">
          <motion.div
            initial="hidden"
            animate={controls}
            variants={container}
            className="text-gray-800 space-y-8"
          >
            {[
              {
                id: "features.section1",
                title: "Atención Personalizada",
                text: "Ofrecemos un acompañamiento detallado y cuidadoso en cada etapa, asegurando que cada elección refleje tus gustos y necesidades con la mayor precisión.",
              },
              {
                id: "features.section2",
                title: "Promoción Distintiva",
                text: "Damos a tu propiedad la visibilidad que merece, utilizando estrategias cuidadosamente seleccionadas para destacar en el mercado.",
              },
              {
                id: "features.section3",
                title: "Red Selecta de Colaboradores",
                text: "Nuestra red de colaboradores en ciudades estratégicas nos permite ofrecerte opciones exclusivas que cumplen con los más altos estándares del sector.",
              },
            ].map((section, index) => (
              <motion.div
                key={index}
                className="px-4 sm:px-8 lg:px-16 xl:px-24"
                variants={item}
              >
                <h3 className="text-xl sm:text-2xl lg:text-2xl text-gray-900">
                  <FormattedMessage id={`${section.id}.title`} defaultMessage={section.title} />
                </h3>
                <p className="text-base sm:text-lg lg:text-xl font-light mt-4 text-gray-900">
                  <FormattedMessage id={`${section.id}.text`} defaultMessage={section.text} />
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Features;
