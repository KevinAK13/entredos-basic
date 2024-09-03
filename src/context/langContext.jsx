import React, { useState, useEffect, useCallback } from "react";
import enUS from "../lang/en-US.json";
import esMX from "../lang/es-MX.json";
import frFR from "../lang/fr-FR.json"; // Importa las traducciones en francés
import { IntlProvider } from "react-intl";
import { motion, AnimatePresence } from "framer-motion";

const langContext = React.createContext();

const LangProvider = ({ children }) => {
  const [locale, setLocale] = useState("es-MX");
  const [messages, setMessages] = useState(esMX);

  useEffect(() => {
    const lang = localStorage.getItem("lang") || "es-MX";
    if (lang === "en-US") {
      setLocale("en-US");
      setMessages(enUS);
    } else if (lang === "fr-FR") {
      setLocale("fr-FR");
      setMessages(frFR);
    } else {
      setLocale("es-MX");
      setMessages(esMX);
    }
    localStorage.setItem("lang", lang);
  }, []);

  const establecerLenguaje = useCallback((lenguaje) => {
    if (lenguaje === "en-US") {
      setLocale("en-US");
      setMessages(enUS);
      localStorage.setItem("lang", "en-US");
    } else if (lenguaje === "fr-FR") {
      setLocale("fr-FR");
      setMessages(frFR);
      localStorage.setItem("lang", "fr-FR");
    } else {
      setLocale("es-MX");
      setMessages(esMX);
      localStorage.setItem("lang", "es-MX");
    }
  }, []);

  return (
    <langContext.Provider value={{ establecerLenguaje, lenguaje: locale }}>
      <AnimatePresence>
        <motion.div
          key={locale}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.1, ease: "easeInOut" }}
        >
          <IntlProvider locale={locale} messages={messages}>
            {children}
          </IntlProvider>
        </motion.div>
      </AnimatePresence>
    </langContext.Provider>
  );
};

export { LangProvider, langContext };
