import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import img1 from "../../assets/img/inmo2.jpg";
import img2 from "../../assets/img/inmo1.jpg";
import { FormattedMessage } from "react-intl";

const Section = () => {
  const [inView, setInView] = useState({
    firstSection: false,
    secondSection: false,
  });

  const firstSectionRef = useRef();
  const secondSectionRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === firstSectionRef.current) {
            setInView((prevState) => ({
              ...prevState,
              firstSection: entry.isIntersecting,
            }));
          } else if (entry.target === secondSectionRef.current) {
            setInView((prevState) => ({
              ...prevState,
              secondSection: entry.isIntersecting,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    if (firstSectionRef.current) observer.observe(firstSectionRef.current);
    if (secondSectionRef.current) observer.observe(secondSectionRef.current);

    return () => {
      if (firstSectionRef.current) observer.unobserve(firstSectionRef.current);
      if (secondSectionRef.current) observer.unobserve(secondSectionRef.current);
    };
  }, []);

  return (
    <div className="overflow-hidden py-20 lg:py-40 bg-white">
      {/* Sección Misión */}
      <SectionContent
        ref={firstSectionRef}
        inView={inView.firstSection}
        image={img1}
        altText="Misión de la Empresa"
        titleId="section.ourMission"
        titleDefault="Misión"
        descriptionId="section.missionDescription"
        descriptionDefault="En Entre Dos, nuestra misión es redefinir el concepto de excelencia en el sector inmobiliario al proporcionar un servicio excepcional y personalizado a nuestros clientes..."
        imagePosition="right"
      />

      <div className="border-t border-white my-12 lg:hidden"></div>

      {/* Sección Visión */}
      <SectionContent
        ref={secondSectionRef}
        inView={inView.secondSection}
        image={img2}
        altText="Visión de la Empresa"
        titleId="section.ourVision"
        titleDefault="Visión"
        descriptionId="section.visionDescription"
        descriptionDefault="Nuestra visión es ser la empresa inmobiliaria de referencia en cuanto a la comercialización y desarrollo de propiedades de calidad y lujo..."
        imagePosition="left"
      />
    </div>
  );
};

const SectionContent = React.forwardRef(
  (
    { inView, image, altText, titleId, titleDefault, descriptionId, descriptionDefault, imagePosition },
    ref
  ) => {
    const isImageFirst = imagePosition === "left";
    return (
      <section ref={ref} className="grid sm:grid-cols-2 gap-8 lg:gap-16 items-center">
        {isImageFirst && (
          <AnimatedImage src={image} alt={altText} inView={inView} direction="left" />
        )}
        <AnimatedTextContent
          titleId={titleId}
          titleDefault={titleDefault}
          descriptionId={descriptionId}
          descriptionDefault={descriptionDefault}
          inView={inView}
        />
        {!isImageFirst && (
          <AnimatedImage src={image} alt={altText} inView={inView} direction="right" />
        )}
      </section>
    );
  }
);

const AnimatedImage = ({ src, alt, inView, direction }) => (
  <motion.img
    alt={alt}
    src={src}
    className="w-full h-[60vh] object-cover rounded-lg shadow-md"
    initial={{ opacity: 0, x: direction === "left" ? -50 : 50 }}
    animate={inView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.7, ease: "easeOut" }}
  />
);

const AnimatedTextContent = ({ titleId, titleDefault, descriptionId, descriptionDefault, inView }) => (
  <motion.div
    className="p-6 lg:p-12"
    initial={{ opacity: 0, x: inView ? 50 : -50 }}
    animate={inView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.7, ease: "easeOut" }}
  >
    <div className="max-w-2xl mx-auto sm:mx-0 text-center sm:text-left space-y-4">
      <motion.h2
        className="text-4xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-normal"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
      >
        <FormattedMessage id={titleId} defaultMessage={titleDefault} />
      </motion.h2>
      <motion.p
        className="text-stone-700 font-light text-lg lg:text-2xl leading-relaxed"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
      >
        <FormattedMessage id={descriptionId} defaultMessage={descriptionDefault} />
      </motion.p>
    </div>
  </motion.div>
);

export default Section;
