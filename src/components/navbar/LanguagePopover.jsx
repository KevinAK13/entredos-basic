import { useState, useContext, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { langContext } from "../../context/langContext";

const Language = ({ isScrolled }) => { // Recibimos el prop isScrolled
  const idioma = useContext(langContext);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("ES");
  const popoverRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleFlagClick = useCallback(
    (lang, langLabel) => {
      idioma.establecerLenguaje(lang);
      setSelectedLanguage(langLabel);
      setIsOpen(false);
    },
    [idioma]
  );

  useEffect(() => {
    if (idioma.lenguaje) {
      const langLabel = idioma.lenguaje.substring(0, 2).toUpperCase();
      setSelectedLanguage(langLabel);
    }
  }, [idioma.lenguaje]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const languages = [
    { lang: "es-MX", label: "ES" },
    { lang: "en-US", label: "EN" },
    // { lang: "fr-FR", label: "FR" },
  ];

  return (
    <div className="relative z-40" ref={popoverRef}>
      <div
        className={`rounded-xs flex items-center third-font font-extralight text-xs p-2 cursor-pointer ${
          isScrolled ? "text-black" : "text-white"
        }`} // Cambiamos el color del texto basado en isScrolled
        onMouseEnter={() => {
          clearTimeout(timeoutRef.current);
          setIsOpen(true);
        }}
        onMouseLeave={() => {
          timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
          }, 200);
        }}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="inline-block font-light text-xl lg:text-lg uppercase">
          {selectedLanguage}
        </span>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full mt-2 right-0 bg-white/90 text-center rounded-xs overflow-hidden shadow-sm"
            onMouseEnter={() => clearTimeout(timeoutRef.current)}
            onMouseLeave={() => {
              timeoutRef.current = setTimeout(() => {
                setIsOpen(false);
              }, 200);
            }}
            aria-label="Language selection"
          >
            {languages
              .filter((language) => language.label !== selectedLanguage)
              .map((language) => (
                <button
                  key={language.lang}
                  className="w-full p-2 flex items-center justify-center text-black hover:text-white hover:bg-neutral-800 transition-all ease-in-out"
                  onClick={() => handleFlagClick(language.lang, language.label)}
                  aria-label={`Switch to ${language.label}`}
                >
                  <span className="text-sm font-extralight">
                    {language.label}
                  </span>
                </button>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Language;
