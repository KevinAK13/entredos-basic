import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FormattedMessage } from "react-intl"; // Importamos FormattedMessage para internacionalización
import logo from "../../assets/img/property/22/14.JPG";

const HeaderTop = () => {
  const [isPopoverVisible, setIsPopoverVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsPopoverVisible(window.scrollY <= 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="h-screen body-font">
      <div className="relative w-full h-screen overflow-hidden">
        <motion.img
          className="absolute inset-0 w-full h-full object-cover"
          src={logo}
          autoPlay
          loop
          muted
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        {/* Contenedor de Texto */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 lg:bottom-2 lg:right-0 lg:translate-x-0 p-4 lg:p-20 flex items-end justify-center lg:justify-start">
          <div className="max-w-2xl text-center lg:text-right text-stone-50">
            <h1 className="hidden lg:block text-4xl md:text-4xl lg:text-6xl xl:text-7xl font-light leading-tight">
              <FormattedMessage id="headerTop.title" defaultMessage="Conoce nuestra historia" />
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderTop;
