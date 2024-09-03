import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FormattedMessage } from "react-intl";
import { CompanyInfo } from "../contact/CompanyInfo";
import Language from "./Lang";
import { useNavigate } from "react-router-dom";
import PropertyModal from "./SellModal";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollTop = useRef(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop.current && scrollTop > 100) {
        setIsVisible(false);
      } else if (scrollTop < lastScrollTop.current) {
        setIsVisible(true);
      }

      lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop;
      setIsScrolled(scrollTop > 800);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFilterSelection = (availability) => {
    navigate(`/properties?availability=${availability}`);
  };

  const navStyles = ` w-full justify-center py-2 mx-auto px-10 top-0 text-xs z-10 transition-all duration-500 transform ${
    isVisible ? "translate-y-0" : "-translate-y-full"
  } ${
    isScrolled
      ? "bg-white/80 text-black shadow-lg backdrop-blur-md -webkit-backdrop-filter: blur(20px)"
      : "bg-transparent text-gray-900"
  }`;

  return (
    <nav className="hidden lg:flex justify-between items-center" aria-label="Main Navigation">
      <div className={navStyles}>
        <div className="max-w-full mt-2 mx-auto flex justify-between items-center">
          <div className="flex-1 px-2 flex justify-start">
            <SellPropertyButton isScrolled={isScrolled} />
          </div>
          <div className="flex-1 flex justify-center">
            <a href="/" className="flex items-center" aria-label="Home">
              <img
                src={isScrolled ? CompanyInfo.logo2 : CompanyInfo.logo2}
                alt={`${CompanyInfo.companyName} Logo`}
                className="w-24 transition-all ease-in-out transform hover:scale-105"
                width="256"
                height="auto"
              />
            </a>
          </div>
                    <div className="flex items-center space-x-4 flex-1 justify-end">
            <NavItem
              href="/"
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
          isScrolled ? "text-black" : "text-gray-900"
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
              className="absolute top-full mt-3 w-48 bg-white text-gray-900 rounded-md shadow-md z-50 border border-gray-200"
            >
              <ul className="py-2">
                {subMenuItems.map((item, index) => (
                  <li
                    key={index}
                    className="text-base text-left font-light transition-all ease-in-out"
                  >
                    <a
                      href={item.href}
                      className="block px-6 py-2 hover:bg-gray-100 w-full h-full"
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

const SellPropertyButton = ({ isScrolled }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={`flex items-center py-2 px-4 text-xl third-font font-light transition-all ease-in-out transform ${
          isScrolled ? "text-black" : "text-gray-900"
        } hover:bg-gray-200/30 rounded-lg`}
      >
        <FormattedMessage id="navbar.publishproperty" defaultMessage="Publicar Propiedad" />
      </button>
      <PropertyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Navbar;
