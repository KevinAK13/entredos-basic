import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FormattedMessage } from "react-intl";
import img1 from "../../assets/img/inmo3.jpg";
import img2 from "../../assets/img/inm2.jpg";
import img3 from "../../assets/img/con9.jpg";
import img4 from "../../assets/img/inmo1.jpg";
import ServicesHome from "../home/ServicesHome";

const Section = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.7 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };



  return (
    <section className="py-40">
      <div className="mb-12">
        <div className="flex flex-col text-left w-full mt-32 mb-12">
          <h1 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal tracking-tight px-4 md:px-8 lg:px-12 text-gray-800 mb-5 lg:mb-8">
            <FormattedMessage id="services.heading" defaultMessage="Nuestros Servicios" />
          </h1>

          <p className="px-12 leading-relaxed text-gray-800 font-light lg:mt-4 mt-4 lg:block tracking-wider text-xl">
            <FormattedMessage
              id="section.services"
              defaultMessage="En Entre Dos, ofrecemos un servicio completo, desde la compra hasta la gestión de alquileres, asegurando el mantenimiento y rentabilidad de su propiedad. Nos encargamos de todo, incluyendo contacto con notarios, abogados, mantenimiento y decoración, para que usted pueda disfrutar de su inversión sin preocupaciones."
            />
          </p>
        </div>
      </div>
    </section>
  );
};

export default Section;
