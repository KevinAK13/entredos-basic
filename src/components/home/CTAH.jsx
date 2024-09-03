import React, { useEffect, useState } from "react";
import { motion, animate, useAnimation } from "framer-motion";
import { FormattedMessage } from "react-intl";
import { useInView } from "react-intersection-observer";
import GalleryCarousel from "./GalleryCarouselHome";

const AnimatedNumber = ({ number, start }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (start) {
      const controls = animate(0, number, {
        duration: 2.5,
        ease: "easeInOut",
        onUpdate: (v) => setValue(Math.round(v)),
      });
      return () => controls.stop();
    }
  }, [start, number]);

  return <motion.span>{value.toLocaleString()}</motion.span>;
};

const CTAH = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 40, damping: 25, staggerChildren: 0.2 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 40, damping: 25 } },
  };

  return (
    <section className="my-auto pt-16 lg:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row">
        {/* Sección Izquierda */}
        <div className="lg:w-1/2 flex items-center justify-center text-center lg:text-left">
          <motion.div
            initial="hidden"
            animate={controls}
            variants={sectionVariants}
            className="text-gray-800 py-8 lg:py-12"
            ref={ref}
          >
            <motion.div className="text-start" variants={childVariants}>
              <h1 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal tracking-tight px-4 md:px-8 lg:px-12 text-gray-800 mb-0 lg:mb-16">
                <FormattedMessage
                  id="sh1.title"
                  defaultMessage="Invierte en confort y seguridad con Häuser & Land"
                />
              </h1>
            </motion.div>
          </motion.div>
        </div>

        {/* Sección Derecha */}
        <div className="lg:w-1/2">
          <motion.div
            initial="hidden"
            animate={controls}
            variants={sectionVariants}
            className="text-gray-800 py-2 lg:py-12"
            ref={ref}
          >
            <motion.div className="text-start" variants={childVariants}>
              <p className="text-md sm:text-base md:text-base lg:text-lg xl:text-xl font-light text-left lg:text-left tracking-normal px-4  md:px-4 text-gray-800 mb-4 lg:mb-8">
                <FormattedMessage
                  id="sh1.content"
                  defaultMessage="Cada propiedad en Häuser & Land es una oportunidad de comenzar una nueva historia. Nos enfocamos en crear comunidades vibrantes y sostenibles, donde la calidad de vida es la prioridad. Aquí, cada detalle está pensado para que sientas que has encontrado tu lugar." 
                />
              </p>
            </motion.div>

            <motion.div className="grid grid-cols-3 gap-8 md:grid-cols-3 mx-auto mt-12 md:mt-0 text-center" variants={childVariants}>
              <motion.div className="p-2" variants={childVariants}>
                <h2 className="text-2xl sm:text-4xl lg:text-4xl font-normal text-gray-800">
                  +<AnimatedNumber number={100} start={inView} />
                </h2>
                <p className="text-xs sm:text-base lg:text-sm font-normal secondary-font uppercase mt-2 text-gray-900">
                  <FormattedMessage
                    id="sh1.stat1"
                    defaultMessage="Metros cuadrados construidos"
                  />
                </p>
              </motion.div>

              <motion.div className="p-2 text-center justify-center" variants={childVariants}>
                <h2 className="text-2xl sm:text-4xl lg:text-4xl font-normal text-center justify-center text-gray-800">
                  <AnimatedNumber number={20} start={inView} />
                </h2>
                <p className="text-xs sm:text-base text-center justify-between lg:text-sm font-normal secondary-font uppercase mt-2 text-gray-900">
                  <FormattedMessage
                    id="sh1.stat2"
                    defaultMessage="Proyectos de alta gama"
                  />
                </p>
              </motion.div>

              <motion.div className="p-2" variants={childVariants}>
                <h2 className="text-2xl sm:text-4xl lg:text-4xl font-normal text-gray-800">
                  +<AnimatedNumber number={30} start={inView} />
                </h2>
                <p className="text-xs sm:text-base lg:text-sm font-normal secondary-font uppercase mt-2 text-gray-900">
                  <FormattedMessage
                    id="sh1.stat3"
                    defaultMessage="Propiedades en cartera"
                  />
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <div className="mt-12 lg:mt-24">
        <GalleryCarousel />
      </div>
    </section>
  );
};

export default CTAH;
