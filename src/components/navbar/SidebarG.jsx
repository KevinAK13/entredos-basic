import React, { useState, useEffect, useRef, useCallback } from "react";
import { TfiMenu, TfiClose } from "react-icons/tfi";
import { SlArrowRight } from "react-icons/sl";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { CompanyInfo } from "../contact/CompanyInfo";  // Ajusta la ruta según sea necesario
import { FormattedMessage } from 'react-intl';

const Sidebar = ({ isOpen, toggleMenu }) => {
  const sidebarRef = useRef(null);
  const [isPropertiesSubmenuOpen, setIsPropertiesSubmenuOpen] = useState(false);
  const [isCompanySubmenuOpen, setIsCompanySubmenuOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggleMenu();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [toggleMenu]);

  const sidebarVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  };

  const togglePropertiesSubmenu = useCallback(() => {
    setIsPropertiesSubmenuOpen((prev) => !prev);
  }, []);

  const toggleCompanySubmenu = useCallback(() => {
    setIsCompanySubmenuOpen((prev) => !prev);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={sidebarRef}
          className="fixed top-0 right-0 h-full w-full lg:w-80 z-40 flex flex-col bg-white shadow-xl p-4"
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 25, mass: 0.5 }}
        >
          <motion.div
            className="fixed top-7 right-4 z-50 cursor-pointer"
            onClick={toggleMenu}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <TfiClose size={24} color="black" />
          </motion.div>
          <div className="relative flex items-center justify-between">
            <img
              src={CompanyInfo.logo2}
              alt={`${CompanyInfo.companyName} Logo`}
              className="h-10 mb-8"
            />
          </div>

          <div className="flex flex-col p-2 pt-8 space-y-6">
            {/* Submenu for Properties */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeInOut" }}
            >
              <button
                onClick={togglePropertiesSubmenu}
                className="flex items-center justify-between text-gray-800 text-3xl secondary-font tracking-wide font-medium uppercase hover:text-gray-900 transition-all ease-in-out w-full text-left"
              >
                <FormattedMessage id="navbar.properties" />
                <SlArrowRight className="ml-2" size={24} />
              </button>
              <AnimatePresence>
                {isPropertiesSubmenuOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="pl-4 mt-2"
                  >
                    <Link
                      to="/properties?availability=inStock"
                      className="block text-gray-700 text-2xl third-font tracking-widest font-light mb-2 hover:text-gray-500"
                    >
                      <FormattedMessage id="navbar.sale" />
                    </Link>
                    <Link
                      to="/properties?availability=forRent"
                      className="block text-gray-700 text-2xl third-font tracking-widest font-light mb-2 hover:text-gray-500"
                    >
                      <FormattedMessage id="navbar.rent" />
                    </Link>
                    <Link
                      to="/properties?availability=preOrder"
                      className="block text-gray-700 text-2xl third-font tracking-widest font-light mb-2 hover:text-gray-500"
                    >
                      <FormattedMessage id="navbar.preorder" />
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Submenu for Company */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeInOut" }}
            >
              <button
                onClick={toggleCompanySubmenu}
                className="flex items-center justify-between text-gray-800 text-3xl secondary-font tracking-wide font-medium uppercase hover:text-gray-900 transition-all ease-in-out w-full text-left"
              >
                <FormattedMessage id="navbar.company" />
                <SlArrowRight className="ml-2" size={24} />
              </button>
              <AnimatePresence>
                {isCompanySubmenuOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="pl-4 mt-2"
                  >
                    <Link
                      to="/about"
                      className="block text-gray-700 text-2xl third-font tracking-widest font-light mb-2 hover:text-gray-500"
                    >
                      <FormattedMessage id="navbar.aboutUs" />
                    </Link>

                    <Link
                      to="/services"
                      className="block text-gray-700 text-2xl third-font tracking-widest font-light mb-2 hover:text-gray-500"
                    >
                      <FormattedMessage id="navbar.services" />
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeInOut" }}
            >
              <Link
                to="/contact"
                className="flex items-center justify-between text-gray-800 text-3xl secondary-font tracking-wide font-medium uppercase hover:text-gray-900 transition-all ease-in-out"
              >
                <FormattedMessage id="navbar.contact" />
                <SlArrowRight className="ml-2" size={24} />
              </Link>
            </motion.div> 
          </div>
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center space-x-5 text-center">
            <a href={CompanyInfo.linkedin} className="text-black secondary-font uppercase hover:text-gray-600 transition">LinkedIn</a>
            <a href={CompanyInfo.instagram} className="text-black secondary-font uppercase hover:text-gray-600 transition">Instagram</a>
            <a href={CompanyInfo.facebook} className="text-black secondary-font uppercase hover:text-gray-600 transition">Facebook</a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const AnimatedIcon = ({ isOpen, onClick, iconColor }) => (
  <motion.div
    className="cursor-pointer"
    onClick={onClick}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
  >
    {isOpen ? <TfiClose size={24} color={iconColor} /> : <TfiMenu size={24} color={iconColor} />}
  </motion.div>
);

const MenuIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const prevScrollY = useRef(0);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
    document.body.style.overflow = isOpen ? "auto" : "hidden";
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsVisible(prevScrollY.current > currentScrollY || currentScrollY <= 100);
      setIsScrolled(currentScrollY > 100);

      prevScrollY.current = currentScrollY <= 0 ? 0 : currentScrollY;
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <motion.div
        className={`fixed top-0 left-0 w-full z-20 lg:hidden transition-all duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${isScrolled ? "bg-white/90 backdrop-blur-sm" : "bg-white/90 backdrop-blur-sm"}`}
        initial={{ opacity: 1 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="flex items-center justify-between p-4">
          <Link to="/">
            <img
              src={isScrolled ? CompanyInfo.logo2 : CompanyInfo.logo2}
              alt={`${CompanyInfo.companyName} Logo`}
              className="h-10"
            />
          </Link>
          <AnimatedIcon isOpen={isOpen} onClick={toggleMenu} iconColor={isScrolled ? "black" : "black"} />
        </div>
      </motion.div>
      <Sidebar isOpen={isOpen} toggleMenu={toggleMenu} />
    </>
  );
};

export default MenuIcon;
