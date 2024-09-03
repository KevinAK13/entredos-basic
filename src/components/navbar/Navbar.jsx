import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FormattedMessage, useIntl } from "react-intl";
import { CompanyInfo } from "../contact/CompanyInfo";
import Language from "./LanguagePopover";
import { useNavigate } from "react-router-dom";
import PropertyModal from "./SellModal"; // PropertyModal for the modal

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // Define el estado del modal aquí
  const lastScrollTop = useRef(0);
  const navigate = useNavigate();
  const intl = useIntl(); // Hook to access intl for formatting messages

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop < lastScrollTop.current || scrollTop <= 100);
      lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop;
      setIsScrolled(scrollTop > 800);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFilterSelection = (availability) => {
    navigate(`/properties?availability=${availability}`);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true); // Función para abrir el modal
  };

  const navStyles = `fixed w-full justify-between py-2 mx-auto px-10 top-0 text-xs z-10 transition-all duration-500 transform ${
    isVisible ? "translate-y-0" : "-translate-y-full"
  } ${isScrolled ? "bg-white/80 text-black backdrop-blur-md" : "bg-transparent text-white"}`;

  return (
    <nav className="hidden md:flex justify-between items-center text-right font-light ter-font" aria-label="Main Navigation">
      <div className={navStyles}>
        <div className="max-w-full mx-auto flex justify-between items-center">
          <div className="flex justify-start">
            <a href="/" className="flex items-center" aria-label="Home">
              <img
                src={isScrolled ? CompanyInfo.logo2 : CompanyInfo.logo}
                alt={intl.formatMessage({ id: 'navbar.logoAlt', defaultMessage: `${CompanyInfo.companyName} Logo` })}
                className="w-24 transition-all ease-in-out transform hover:scale-105"

              />
            </a>
          </div>
          <div className="flex-1 flex justify-end items-center space-x-4">
            <NavItem
              href="/properties"
              messageId="navbar.properties"
              subMenuItems={[
                { label: <FormattedMessage id="navbar.sale" defaultMessage="Venta" />, onClick: () => handleFilterSelection("inStock") },
                { label: <FormattedMessage id="navbar.rent" defaultMessage="Renta" />, onClick: () => handleFilterSelection("forRent") },
                { label: <FormattedMessage id="navbar.preorder" defaultMessage="Preventa" />, onClick: () => handleFilterSelection("preOrder") },
                { label: <FormattedMessage id="navbar.publishproperty" defaultMessage="Publicar Propiedad" />, onClick: handleOpenModal }, // Añadida opción de menú
              ]}
              isScrolled={isScrolled}
            />
            <NavItem
              messageId="navbar.company"
              subMenuItems={[
                { label: <FormattedMessage id="navbar.aboutUs" defaultMessage="About Us" />, href: "/about" },
                { label: <FormattedMessage id="navbar.services" defaultMessage="Services" />, href: "/services" },
                // { label: <FormattedMessage id="navbar.workWithUs" defaultMessage="Work with Us" />, href: "/work-with-us" },
                // { label: <FormattedMessage id="navbar.blog" defaultMessage="Blog" />, href: "/blog" },
              ]}
              isScrolled={isScrolled}
            />
            <NavItem href="/contact" messageId="navbar.contact" isScrolled={isScrolled} />
            <Language isScrolled={isScrolled} />
          </div>
        </div>
      </div>
      <PropertyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> {/* Modal fuera de la barra de navegación */}
    </nav>
  );
};

const NavItem = ({ href, messageId, subMenuItems, isScrolled }) => {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const timeoutRef = useRef(null);

  return (
    <div
      className="relative group"
      onMouseEnter={() => {
        clearTimeout(timeoutRef.current);
        setIsPopoverVisible(true);
      }}
      onMouseLeave={() => {
        timeoutRef.current = setTimeout(() => {
          setIsPopoverVisible(false);
        }, 200);
      }}
    >
      <a
        href={href}
        className={`flex items-center py-2 px-4 text-xl third-font font-light transition-all ease-in-out transform ${
          isScrolled ? "text-black" : "text-white"
        } hover:bg-gray-200/30 rounded-lg`}
      >
        <FormattedMessage id={messageId} />
      </a>
      {subMenuItems && (
        <AnimatePresence>
          {isPopoverVisible && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full mt-3 w-48 bg-white text-gray-900 rounded-lg shadow-sm z-50 border border-gray-200/60"
            >
              <ul className="py-2">
                {subMenuItems.map((item, index) => (
                  <li
                    key={index}
                    className="text-base text-left third-font tracking font-light transition-all ease-in-out"
                  >
                    <a
                      href={item.href}
                      onClick={item.onClick}
                      className="block px-6 py-2 hover:bg-gray-100 rounded transition-all ease-in-out w-full h-full"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default Navbar;
