import React, { useState, useRef, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { CiMenuFries } from "react-icons/ci";
import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import Lang from "../../components/navbar/Lang";
import { LiaInstagram, LiaFacebookF } from "react-icons/lia";
import FavoritesPopover from "../../components/fav/FavPopoverM";
import { FavoritesContext } from "../../context/FavoritesContext";
import logo from "../../assets/img/1.jpg";

const MobileMenu = ({ isLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const sidebarRef = useRef(null);
  const favoritesPopoverRef = useRef(null);
  const { favorites } = useContext(FavoritesContext);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        (!favoritesPopoverRef.current ||
          !favoritesPopoverRef.current.contains(event.target))
      ) {
        setIsOpen(false);
        setIsFavoritesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isFavoritesOpen) setIsFavoritesOpen(false);
  };

  const toggleFavoritesPopover = () => {
    setIsFavoritesOpen((prev) => !prev);
    if (!isOpen) setIsOpen(false);
  };

  const variants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        restDelta: 100,
      },
    },
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        type: "spring",
        stiffness: 600,
        damping: 100,
      },
    },
  };

  const menuItemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
      },
    },
    closed: {
      opacity: 0,
      y: -20,
    },
  };

  return (
    <div>
      <div
        className={`lg:hidden fixed top-0 left-0 w-full z-50 ${
          isScrolled ? "bg-stone-700" : "bg-transparent"
        } p-4 flex items-center justify-between transition-all ease-in-out`}
      >
        <motion.div className="xl:hidden rounded-full left-6 z-40">
          <img className="w-10 h-10" src={logo} alt="Inmobiliaria Sánchez" />
        </motion.div>
        {/* Mobile Button and Favorites Icon */}
        <div className="xl:hidden flex items-center space-x-4">
          <div className="relative flex items-center">
            <motion.div
              className="text-white shadow-2xl rounded-md p-1 cursor-pointer"
              onClick={toggleFavoritesPopover}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <FiHeart size={24} color="white" />
            </motion.div>
            <AnimatePresence>
              {isFavoritesOpen && (
                <motion.div
                  ref={favoritesPopoverRef}
                  className="absolute top-full mt-2 right-0 w-64 bg-black text-center rounded-sm overflow-hidden shadow-sm z-50"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <FavoritesPopover />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <motion.div
            className="text-white shadow-2xl rounded-md p-1 cursor-pointer"
            onClick={toggleMenu}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {isOpen ? (
              <AiOutlineClose size={24} color="white" />
            ) : (
              <CiMenuFries size={24} color="white" />
            )}
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={sidebarRef}
            className={`fixed top-0 right-0 bottom-0 left-0 z-40 flex flex-col justify-center items-center w-full h-screen overflow-hidden transition-all duration-300 ${
              isScrolled ? "bg-stone-700" : "bg-stone-700"
            }`}
            initial="closed"
            animate="open"
            exit="closed"
            variants={variants}
          >
            <motion.ul
              initial="closed"
              animate={isOpen ? "open" : "closed"}
              variants={menuItemVariants}
              className="flex flex-col items-center w-full"
              transition={{ staggerChildren: 0.1 }}
              style={{ width: "80%", maxWidth: "320px" }}
            >
              <motion.li
                variants={menuItemVariants}
                className="text-stone-200 p-4 font-light text-2xl lg:text-3xl uppercase"
                whileHover={{ scale: 1.05 }}
              >
                <Link to="/">
                  <FormattedMessage id="navbar.home" defaultMessage="Inicio" />
                </Link>
              </motion.li>
              <motion.li
                variants={menuItemVariants}
                className="text-stone-200 p-4 font-light text-2xl lg:text-3xl uppercase"
                whileHover={{ scale: 1.05 }}
              >
                <Link to="/properties">
                  <FormattedMessage
                    id="navbar.properties"
                    defaultMessage="Propiedades"
                  />
                </Link>
              </motion.li>
              <motion.li
                variants={menuItemVariants}
                className="text-stone-200 p-4 font-light text-2xl lg:text-3xl uppercase"
                whileHover={{ scale: 1.05 }}
              >
                <Link to="/services">
                  <FormattedMessage
                    id="navbar.services"
                    defaultMessage="Servicios"
                  />
                </Link>
              </motion.li>
              <motion.li
                variants={menuItemVariants}
                className="text-stone-200 p-4 font-light text-2xl lg:text-3xl uppercase"
                whileHover={{ scale: 1.05 }}
              >
                <Link to="/about">
                  <FormattedMessage
                    id="navbar.about"
                    defaultMessage="Nosotros"
                  />
                </Link>
              </motion.li>
              <motion.li
                variants={menuItemVariants}
                className="text-stone-200 p-4 font-light text-2xl lg:text-3xl uppercase"
                whileHover={{ scale: 1.05 }}
              >
                <Link to="/contact">
                  <FormattedMessage
                    id="navbar.contact"
                    defaultMessage="Contacto"
                  />
                </Link>
              </motion.li>
              <li className="items-center justify-center object-center">
                <Lang />
              </li>
              <motion.li
                variants={menuItemVariants}
                className="text-gray-900 mt-20 flex items-center space-x-5 justify-center"
              >
                <a
                  href="https://www.instagram.com/alux_immo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=""
                >
                  <LiaInstagram size={28} color="white" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61556188351846"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=""
                >
                  <LiaFacebookF size={28} color="white" />
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;
