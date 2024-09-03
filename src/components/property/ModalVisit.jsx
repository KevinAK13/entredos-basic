import React from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={handleClickOutside}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="bg-white rounded-lg shadow-lg py-12 px-4 sm:py-10 sm:px-8 max-w-lg w-full sm:max-w-6xl overflow-y-auto max-h-[90vh]"
      >
        {children}
      </motion.div>
    </div>,
    document.getElementById('modal-root')  // Renderiza el modal en este nodo
  );
};

export default Modal;
